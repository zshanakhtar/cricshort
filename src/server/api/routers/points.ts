import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db/index";
import { points } from "~/server/db/points";

export const pointsRouter = createTRPCRouter({
  getPoints: publicProcedure.query(async () => {
    // Fetch all points from the DB
    const result = await db.select().from(points);
    return result;
  }),
});
