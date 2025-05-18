import { and, eq } from "drizzle-orm";
import { pointsSchema, type PointEntry } from "../models/points";
import { db } from "../server/db/index";
import { matches } from "../server/db/matches";
import { points as pointsTable } from "../server/db/points";

const POINTS_API_URL =
  "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-groupstandings.js?ongroupstandings=_jqjsp&_1746742781756=";

async function fetchPointsFromApi(): Promise<PointEntry[]> {
  const response = await fetch(POINTS_API_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:138.0) Gecko/20100101 Firefox/138.0",
      Accept: "*/*",
      "Accept-Language": "en-GB,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      DNT: "1",
      Connection: "keep-alive",
      Referer: "https://www.iplt20.com/",
      "Sec-Fetch-Dest": "script",
      "Sec-Fetch-Mode": "no-cors",
      "Sec-Fetch-Site": "cross-site",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch points data");
  const text = await response.text();
  const jsonStr = text.substring(17, text.length - 2);
  const parsed = pointsSchema.parse(JSON.parse(jsonStr));
  return parsed.points;
}

function normalizePointEntry(point: PointEntry): PointEntry {
  return {
    ...point,
    CompetitionID: point.CompetitionID ?? null,
    TeamID: point.TeamID ?? null,
    MATCH_ID: point.MATCH_ID ?? null,
  };
}

async function matchExists(matchId: string | null): Promise<boolean> {
  if (!matchId) return false;
  const matchIdNum = Number(matchId);
  if (isNaN(matchIdNum)) return false;
  const rows = await db
    .select()
    .from(matches)
    .where(eq(matches.MatchID, matchIdNum));
  return rows.length > 0;
}

async function findExistingPointEntry(
  entry: PointEntry,
): Promise<(PointEntry & { id: number }) | undefined> {
  if (!entry.CompetitionID || !entry.TeamID) return undefined;
  const rows = await db
    .select()
    .from(pointsTable)
    .where(
      and(
        eq(pointsTable.CompetitionID, entry.CompetitionID),
        eq(pointsTable.TeamID, entry.TeamID),
      ),
    );
  return rows[0];
}

async function createOrUpdatePointEntry(entry: PointEntry): Promise<void> {
  const normalizedEntry = normalizePointEntry(entry);

  // Create match if it doesn't exist
  if (normalizedEntry.MATCH_ID) {
    const matchIdNum = Number(normalizedEntry.MATCH_ID);
    if (!isNaN(matchIdNum) && !(await matchExists(normalizedEntry.MATCH_ID))) {
      //   await insertMatch(db, { MatchID: matchIdNum });
      await db
        .insert(matches)
        .values({ MatchID: matchIdNum })
        .onConflictDoNothing();
    }
  }

  const existing = await findExistingPointEntry(normalizedEntry);
  if (existing) {
    // await updatePoints(db, existing.id, normalizedEntry);
    await db
      .update(pointsTable)
      .set(normalizedEntry)
      .where(eq(pointsTable.id, existing.id));
  } else {
    // await insertPoints(db, normalizedEntry);
    await db.insert(pointsTable).values(normalizedEntry).onConflictDoNothing();
  }
}

export async function syncPointsTable(): Promise<void> {
  const apiEntries = await fetchPointsFromApi();
  for (const entry of apiEntries) {
    await createOrUpdatePointEntry(entry);
  }
  console.log(
    `Points table synced. Total entries processed: ${apiEntries.length}`,
  );
}

export default async function main(): Promise<void> {
  await syncPointsTable();
}

main().catch((err) => {
  console.error("Failed to sync points table:", err);
  process.exit(1);
});
