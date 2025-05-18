import { db } from "../server/db/index";
import { matches as matchesTable } from "../server/db/matches";
import { eq } from "drizzle-orm";
import { matchesSchema, matchSchema, type Match } from "../models/matches";
import { unwrapJsonp } from "./utils/jsonp";

const MATCHES_API_URL =
  "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js";

async function fetchMatchesFromApi(): Promise<Match[]> {
  const response = await fetch(MATCHES_API_URL);
  if (!response.ok) throw new Error("Failed to fetch matches data");
  const text = await response.text();
  const parsedData = matchesSchema.parse(unwrapJsonp(text));
  return parsedData.Matchsummary;
}

function normalizeMatchForDb(match: Match): Record<string, unknown> {
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
  return matchSchema.parse(rows[0]) ?? null;
}

async function insertMatch(match: Match): Promise<void> {
  if (match.MatchID == null) return;
  const normalized = (normalizeMatchForDb(match));
  await db.insert(matchesTable).values([normalized]); // Wrap in array for bulk insert
}

async function updateMatch(matchId: number, updates: Match): Promise<void> {
  if (matchId == null) return;
  const normalized = (normalizeMatchForDb(updates));
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
