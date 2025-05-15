import { db } from "../server/db/index";
import { matches as matchesTable } from "../server/db/matches";
import { eq } from "drizzle-orm";
import { matchesSchema, type Match } from "../models/matches";

const MATCHES_API_URL =
  "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js?MatchSchedule=_jqjsp&_1746719930699=";

// Fix unsafe assignments by properly typing the parsed data
async function fetchMatchesFromApi(): Promise<Match[]> {
  const response = await fetch(MATCHES_API_URL, {
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
  if (!response.ok) throw new Error("Failed to fetch matches data");
  const text = await response.text();
  const jsonStr = text.substring(14, text.length - 2);
  const parsedData = matchesSchema.parse(JSON.parse(jsonStr));
  return parsedData.Matchsummary;
}

function filterUndefined<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined),
  ) as T;
}

// Fix type mismatches in .values() and .set() calls by ensuring proper type conversion
function normalizeMatchForDb(match: Match): Record<string, unknown> {
  // Convert values to match DB schema types
  return {
    ...match,
    HomeTeamID:
      match.HomeTeamID !== null ? Number(match.HomeTeamID) : undefined,
    AwayTeamID:
      match.AwayTeamID !== null ? Number(match.AwayTeamID) : undefined,
    SecondInningsFirstBattingID:
      match.SecondInningsFirstBattingID !== null
        ? Number(match.SecondInningsFirstBattingID)
        : undefined,
    SecondInningsSecondBattingID:
      match.SecondInningsSecondBattingID !== null
        ? Number(match.SecondInningsSecondBattingID)
        : undefined,
    MatchID: match.MatchID !== null ? Number(match.MatchID) : undefined,
    CompetitionID:
      match.CompetitionID !== null ? Number(match.CompetitionID) : undefined,
  };
}

async function findExistingMatch(matchId: number): Promise<Match | null> {
  if (matchId == null) return null;
  const rows = await db
    .select()
    .from(matchesTable)
    .where(eq(matchesTable.MatchID, matchId));
  return rows[0] ?? null;
}

async function insertMatch(match: Match): Promise<void> {
  if (match.MatchID == null) return;
  const normalized = filterUndefined(normalizeMatchForDb(match));
  await db.insert(matchesTable).values([normalized]); // Wrap in array for bulk insert
}

async function updateMatch(matchId: number, updates: Match): Promise<void> {
  if (matchId == null) return;
  const normalized = filterUndefined(normalizeMatchForDb(updates));
  await db
    .update(matchesTable)
    .set(normalized)
    .where(eq(matchesTable.MatchID, matchId));
}

async function upsertMatch(match: Match): Promise<void> {
  if (match.MatchID == null) return;
  const existing = await findExistingMatch(match.MatchID);
  if (existing) {
    await updateMatch(match.MatchID, match);
  } else {
    await insertMatch(match);
  }
}

export async function syncMatchesTable(): Promise<void> {
  const apiMatches = await fetchMatchesFromApi();
  for (const match of apiMatches) {
    await upsertMatch(match);
  }
  console.log(
    `Matches table synced. Total entries processed: ${apiMatches.length}`,
  );
}

export default async function main(): Promise<void> {
  await syncMatchesTable();
}

main().catch((err) => {
  console.error("Failed to sync matches table:", err);
  process.exit(1);
});
