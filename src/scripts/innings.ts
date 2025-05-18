import { and, eq } from "drizzle-orm";
import {
  inningsSchema,
  type BattingCard,
  type BowlingCard,
  type Extras as ExtrasType,
  type Innings,
  type PartnershipScore,
} from "../models/innings";
import { matchesSchema, type Matches } from "../models/matches";
import { db } from "../server/db/index";
import {
  battingCard,
  bowlingCard,
  extras,
  partnershipScore,
} from "../server/db/innings";
import { matches } from "../server/db/matches";
import { INNINGS1_URL, INNINGS2_URL } from "./constants/urls";
import { unwrapJsonp } from "./utils/jsonp";

async function fetchInningsFromApi(
  matchId: string,
  innings: "1" | "2",
): Promise<Innings> {
  const url = innings === "1" ? INNINGS1_URL(matchId) : INNINGS2_URL(matchId);
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch innings data");
  const text = await response.text();
  const parsed = unwrapJsonp(text) as unknown;
  return inningsSchema.parse(parsed);
}

function normalizeExtras(row: ExtrasType): Record<string, unknown> {
  return {
    ...row,
    InningsNo: String(row.InningsNo),
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

function getInnings(data: Innings, inningsNo: "1" | "2") {
  return inningsNo === "1" ? data.Innings1 : data.Innings2;
}

async function insertBattingCard(row: BattingCard) {
  return db.insert(battingCard).values(row);
}
async function insertBowlingCard(row: BowlingCard) {
  return db.insert(bowlingCard).values(row);
}
async function insertExtras(row: ExtrasType) {
  return db.insert(extras).values(normalizeExtras(row));
}
async function insertPartnershipScore(row: PartnershipScore) {
  return db.insert(partnershipScore).values(normalizePartnershipScore(row));
}

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
      and(eq(extras.MatchID, String(matchId)), eq(extras.InningsNo, inningsNo)),
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
        eq(partnershipScore.MatchID, matchId),
        eq(partnershipScore.InningsNo, inningsNo),
      ),
    );
  for (const row of rows) await insertPartnershipScore(row);
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
    const inn = getInnings(data, inningsNo);
    if (!inn) continue;

    const matchIdNum = Number(matchId);
    const inningsNoNum = Number(inningsNo);

    if (inn.BattingCard && inn.BattingCard.length > 0) {
      if (
        inn.BattingCard.filter(
          (batt) =>
            batt.MatchID && batt.InningsNo && batt.TeamID && batt.PlayerID,
        ).length === 0
      ) {
        console.warn(
          `No valid batting cards for match ${matchId} innings ${inningsNo}`,
        );
      } else
        await upsertBattingCards(matchIdNum, inningsNoNum, inn.BattingCard);
    }
    if (inn.BowlingCard && inn.BowlingCard.length > 0) {
      if (
        inn.BowlingCard.filter(
          (batt) =>
            batt.MatchID && batt.InningsNo && batt.TeamID && batt.PlayerID,
        ).length === 0
      ) {
        console.warn(
          `No valid bowling cards for match ${matchId} innings ${inningsNo}`,
        );
      } else
        await upsertBowlingCards(matchIdNum, inningsNoNum, inn.BowlingCard);
    }
    if (inn.Extras && inn.Extras.length > 0) {
      if (
        inn.Extras.filter(
          (batt) =>
            batt.MatchID && batt.InningsNo && batt.TeamID && batt.FallWickets,
        ).length === 0
      ) {
        console.warn(
          `No valid extras for match ${matchId} innings ${inningsNo}`,
        );
      } else await upsertExtras(matchIdNum, inningsNoNum, inn.Extras);
    }
    if (inn.PartnershipScores && inn.PartnershipScores.length > 0) {
      if (
        inn.PartnershipScores.filter(
          (batt) =>
            batt.MatchID &&
            batt.InningsNo &&
            batt.BattingTeamID &&
            batt.StrikerID &&
            batt.NonStrikerID,
        ).length === 0
      ) {
        console.warn(
          `No valid partnership scores for match ${matchId} innings ${inningsNo}`,
        );
      } else
        await upsertPartnershipScores(
          matchIdNum,
          inningsNoNum,
          inn.PartnershipScores,
        );
    }
  }
}

async function getAllMatchesFromDb(): Promise<Matches> {
  const result = await db.select().from(matches);
  return matchesSchema.parse({ Matchsummary: result });
}

export default async function main(): Promise<void> {
  const matchesList = await getAllMatchesFromDb();
  for (const match of matchesList.Matchsummary) {
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
