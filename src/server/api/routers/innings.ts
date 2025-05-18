import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db/index";
import {
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
      const [batting, bowling, extrasData, partnerships] = await Promise.all([
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
              eq(extras.InningsNo, input.innings),
            ),
          ),
        db
          .select()
          .from(partnershipScore)
          .where(
            and(
              eq(partnershipScore.MatchID, input.matchId),
              eq(partnershipScore.InningsNo, input.innings),
            ),
          ),
      ]);
      const key = input.innings === "1" ? "Innings1" : "Innings2";
      return {
        [key]: {
          BattingCard: batting,
          BowlingCard: bowling,
          Extras: extrasData,
          PartnershipScores: partnerships,
        },
      };
    }),
});
