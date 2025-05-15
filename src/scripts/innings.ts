import { db } from "../server/db/index";
// Remove unused BaseSQLiteDatabase import
import {
  battingCard,
  bowlingCard,
  extras,
  partnershipScore,
} from "../server/db/innings";
import { eq, and } from "drizzle-orm";
import {
  inningsSchema,
  type Innings,
  type BattingCard,
  type BowlingCard,
  type Extras as ExtrasType,
  type PartnershipScore,
} from "../models/innings";
import type { Match } from "../models/matches";

// Helper to fetch innings data from API
async function fetchInningsFromApi(
  matchId: string,
  innings: "1" | "2",
): Promise<Innings> {
  const url =
    innings === "1"
      ? `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/${matchId}-Innings1.js?onScoring=_jqjsp&_1746730532635=`
      : `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/${matchId}-Innings2.js?callback=onScoring&_=1746729843775`;
  const response = await fetch(url, {
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
  if (!response.ok) throw new Error("Failed to fetch innings data");
  const text = await response.text();
  // Remove 'onScoring(' from start and last two chars from end
  const jsonStr = text.substring(10, text.length - 2);
  // Type-safe JSON parsing
  const parsed = JSON.parse(jsonStr) as unknown;
  return inningsSchema.parse(parsed);
}

function filterUndefined<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined),
  ) as T;
}

function normalizeBattingCard(card: BattingCard): Record<string, unknown> {
  return {
    ...card,
    MatchID: Number(card.MatchID),
    InningsNo: Number(card.InningsNo),
    TeamID: Number(card.TeamID),
    PLAYER_ID: String(card.PLAYER_ID),
  };
}

function normalizeBowlingCard(card: BowlingCard): Record<string, unknown> {
  return {
    ...card,
    MatchID: Number(card.MatchID),
    InningsNo: Number(card.InningsNo),
    TeamID: Number(card.TeamID),
    Overs: String(card.Overs),
    Economy: String(card.Economy),
    StrikeRate: String(card.StrikeRate),
  };
}

function normalizeExtras(row: ExtrasType): Record<string, unknown> {
  return {
    ...row,
    MatchID: String(row.MatchID),
    InningsNo: String(row.InningsNo),
    TeamID: String(row.TeamID),
    FallWickets: String(row.FallWickets),
    MaxPartnerShipRuns: String(row.MaxPartnerShipRuns),
  };
}

function normalizePartnershipScore(
  row: PartnershipScore,
): Record<string, unknown> {
  return {
    ...row,
    MatchID: String(row.MatchID),
    BattingTeamID: String(row.BattingTeamID),
    InningsNo: String(row.InningsNo),
    PartnershipTotal: String(row.PartnershipTotal),
    StrikerRuns: String(row.StrikerRuns),
    StrikerBalls: String(row.StrikerBalls),
    Extras: String(row.Extras),
    NonStrikerRuns: String(row.NonStrikerRuns),
    NonStrikerBalls: String(row.NonStrikerBalls),
    MatchMaxOver: String(row.MatchMaxOver),
    MatchMinOver: String(row.MatchMinOver),
    RowNumber: String(row.RowNumber),
  };
}

function normalizeInnings(
  inn: Innings["Innings1"] | Innings["Innings2"] | undefined,
): Innings["Innings1"] | Innings["Innings2"] | undefined {
  if (!inn) return undefined;

  const normalized = {
    BattingCard:
      inn.BattingCard?.map((card) => ({
        ...card, // Preserve all original properties
        MatchID: Number(card.MatchID),
        InningsNo: Number(card.InningsNo),
        TeamID: Number(card.TeamID),
        PLAYER_ID: String(card.PLAYER_ID),
      })) ?? [],
    BowlingCard: inn.BowlingCard?.map((card) => ({
      ...card, // Preserve all original properties
      MatchID: Number(card.MatchID),
      InningsNo: Number(card.InningsNo),
      TeamID: Number(card.TeamID),
      Overs: String(card.Overs),
      Economy: String(card.Economy),
      StrikeRate: String(card.StrikeRate),
    })),
    Extras: inn.Extras?.map((extra) => ({
      ...extra, // Preserve all original properties
      MatchID: String(extra.MatchID),
      InningsNo: String(extra.InningsNo),
      TeamID: String(extra.TeamID),
      FallWickets: String(extra.FallWickets),
      MaxPartnerShipRuns: String(extra.MaxPartnerShipRuns),
    })),
    PartnershipScores: inn.PartnershipScores?.map((score) => ({
      ...score, // Preserve all original properties
      MatchID: String(score.MatchID),
      BattingTeamID: String(score.BattingTeamID),
      InningsNo: String(score.InningsNo),
      PartnershipTotal: String(score.PartnershipTotal),
      StrikerRuns: String(score.StrikerRuns),
      StrikerBalls: String(score.StrikerBalls),
      Extras: String(score.Extras),
      NonStrikerRuns: String(score.NonStrikerRuns),
      NonStrikerBalls: String(score.NonStrikerBalls),
      MatchMaxOver: String(score.MatchMaxOver),
      MatchMinOver: String(score.MatchMinOver),
      RowNumber: String(score.RowNumber),
    })),
  };

  return normalized;
}

function getInningsSafe(data: Innings, inningsNo: "1" | "2") {
  return inningsNo === "1" ? data.Innings1 : data.Innings2;
}

// CRUD helpers for each table
async function insertBattingCard(row: BattingCard) {
  return db
    .insert(battingCard)
    .values(filterUndefined(normalizeBattingCard(row)));
}
async function insertBowlingCard(row: BowlingCard) {
  return db
    .insert(bowlingCard)
    .values(filterUndefined(normalizeBowlingCard(row)));
}
async function insertExtras(row: ExtrasType) {
  return db.insert(extras).values(filterUndefined(normalizeExtras(row)));
}
async function insertPartnershipScore(row: PartnershipScore) {
  return db
    .insert(partnershipScore)
    .values(filterUndefined(normalizePartnershipScore(row)));
}

// Upsert helpers (delete old, insert new for simplicity)
async function upsertBattingCards(
  matchId: number,
  inningsNo: number,
  cards: BattingCard[],
) {
  await db
    .delete(battingCard)
    .where(
      and(
        eq(battingCard.MatchID, matchId),
        eq(battingCard.InningsNo, inningsNo),
      ),
    );
  for (const card of cards) await insertBattingCard(card);
}
async function upsertBowlingCards(
  matchId: number,
  inningsNo: number,
  cards: BowlingCard[],
) {
  await db
    .delete(bowlingCard)
    .where(
      and(
        eq(bowlingCard.MatchID, matchId),
        eq(bowlingCard.InningsNo, inningsNo),
      ),
    );
  for (const card of cards) await insertBowlingCard(card);
}
async function upsertExtras(
  matchId: number,
  inningsNo: number,
  rows: ExtrasType[],
) {
  await db
    .delete(extras)
    .where(
      and(
        eq(extras.MatchID, String(matchId)),
        eq(extras.InningsNo, String(inningsNo)),
      ),
    );
  for (const row of rows) await insertExtras(row);
}
async function upsertPartnershipScores(
  matchId: number,
  inningsNo: number,
  rows: PartnershipScore[],
) {
  await db
    .delete(partnershipScore)
    .where(
      and(
        eq(partnershipScore.MatchID, String(matchId)),
        eq(partnershipScore.InningsNo, String(inningsNo)),
      ),
    );
  for (const row of rows) await insertPartnershipScore(row);
}

// Helper to get all matches from the DB (implementing the full drizzle query here)
import { matches } from "../server/db/matches";
async function getAllMatchesFromDb(): Promise<Match[]> {
  const results = await db.select().from(matches);
  // Convert number fields to match the Match type
  return results.map((match) => ({
    ...match,
    HomeTeamID: match.HomeTeamID,
    AwayTeamID: match.AwayTeamID,
    SecondInningsFirstBattingID: match.SecondInningsFirstBattingID,
    SecondInningsSecondBattingID: match.SecondInningsSecondBattingID,
    WinningTeamID: match.WinningTeamID,
  }));
}

export async function syncInningsForMatch(matchId: string): Promise<void> {
  for (const inningsNo of ["1", "2"] as const) {
    let data: Innings;
    try {
      data = await fetchInningsFromApi(matchId, inningsNo);
    } catch (error) {
      console.warn(
        `No data for match ${matchId} innings ${inningsNo}:`,
        error instanceof Error ? error.message : "Unknown error",
      );
      continue;
    }
    const inn = getInningsSafe(data, inningsNo);
    if (!inn) continue;

    // Type-safe normalization
    const normInn = normalizeInnings(inn);
    if (!normInn) continue;

    const matchIdNum = Number(matchId);
    const inningsNoNum = Number(inningsNo);

    if (normInn.BattingCard && normInn.BattingCard.length > 0) {
      await upsertBattingCards(matchIdNum, inningsNoNum, normInn.BattingCard);
    }
    if (normInn.BowlingCard && normInn.BowlingCard.length > 0) {
      await upsertBowlingCards(matchIdNum, inningsNoNum, normInn.BowlingCard);
    }
    if (normInn.Extras && normInn.Extras.length > 0) {
      await upsertExtras(matchIdNum, inningsNoNum, normInn.Extras);
    }
    if (normInn.PartnershipScores && normInn.PartnershipScores.length > 0) {
      await upsertPartnershipScores(
        matchIdNum,
        inningsNoNum,
        normInn.PartnershipScores,
      );
    }
  }
}

export default async function main(): Promise<void> {
  // Fetch all matches from the database
  const matchesList = await getAllMatchesFromDb();
  for (const match of matchesList) {
    const matchId = match.MatchID;
    if (!matchId) continue;
    try {
      await syncInningsForMatch(String(matchId));
      console.log(`Innings synced for match ${matchId}`);
    } catch (err) {
      console.error(`Failed to sync innings for match ${matchId}:`, err);
    }
  }
}

main().catch((err) => {
  console.error("Failed to sync innings:", err);
  process.exit(1);
});
