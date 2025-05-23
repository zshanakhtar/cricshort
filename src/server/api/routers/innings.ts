import { and, eq } from "drizzle-orm";
import { z } from "zod";
import {
  ballbyballSchema,
  battingCardSchema,
  bowlingCardSchema,
  extrasSchema,
  partnershipScoreSchema,
} from "~/models/innings";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db/index";
import {
  ballByBall,
  battingCard,
  bowlingCard,
  extras,
  partnershipScore,
} from "~/server/db/innings";

export const inningsRouter = createTRPCRouter({
  getInnings: publicProcedure
    .input(z.object({ matchId: z.string(), innings: z.enum(["1", "2"]) }))
    .query(async ({ input }) => {
      const matchIdNum = Number(input.matchId);
      const inningsNo = Number(input.innings);
      const [batting, bowling, extrasData, partnerships, ballByBallData] =
        await Promise.all([
          db
            .select()
            .from(battingCard)
            .where(
              and(
                eq(battingCard.MatchID, matchIdNum),
                eq(battingCard.InningsNo, inningsNo),
              ),
            ),
          db
            .select()
            .from(bowlingCard)
            .where(
              and(
                eq(bowlingCard.MatchID, matchIdNum),
                eq(bowlingCard.InningsNo, inningsNo),
              ),
            ),
          db
            .select()
            .from(extras)
            .where(
              and(
                eq(extras.MatchID, input.matchId),
                eq(extras.InningsNo, inningsNo),
              ),
            ),
          db
            .select()
            .from(partnershipScore)
            .where(
              and(
                eq(partnershipScore.MatchID, matchIdNum),
                eq(partnershipScore.InningsNo, inningsNo),
              ),
            ),
          db
            .select()
            .from(ballByBall)
            .where(
              and(
                eq(ballByBall.MatchID, input.matchId),
                eq(ballByBall.InningsNo, inningsNo),
              ),
            ),
        ]);
      const key = input.innings === "1" ? "Innings1" : "Innings2";
      return {
        [key]: {
          BattingCard: batting.map((it) => battingCardSchema.parse(it)),
          BowlingCard: bowling.map((it) => bowlingCardSchema.parse(it)),
          Extras: extrasData.map((it) => extrasSchema.parse(it)),
          PartnershipScores: partnerships.map((it) =>
            partnershipScoreSchema.parse(it),
          ),
          BallByBall: ballByBallData.map((it) => ballbyballSchema.parse(it)),
        },
      };
    }),
});
