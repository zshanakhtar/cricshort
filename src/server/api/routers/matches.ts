import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db/index";
import { matches } from "~/server/db/matches";
import { eq } from "drizzle-orm";
import { matchesSchema } from "~/models/matches";

export const matchesRouter = createTRPCRouter({
  getMatchById: publicProcedure
    .input(z.object({ matchId: z.string() }))
    .query(async ({ input }) => {
      const matchIdNum = Number(input.matchId);
      const result = await db
        .select()
        .from(matches)
        .where(eq(matches.MatchID, matchIdNum));
      return result[0] ?? null;
    }),

  getAllMatches: publicProcedure.query(async () => {
    const result = await db.select().from(matches);
    return matchesSchema.parse({ Matchsummary: result });
  }),
});
