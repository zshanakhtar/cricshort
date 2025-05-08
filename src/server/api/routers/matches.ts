import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { posts } from "~/server/db/schema";
import { matchesSchema } from "~/models/matches";

export const matchesRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async () => {
      try {
        const response = await fetch(
          "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js?MatchSchedule=_jqjsp&_1746719930699=",
          {
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
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch match data");
        }

        const matchData = await response.text();
        const matchJson = matchData.substring(14, matchData.length - 2);
        const parsedData = JSON.parse(matchJson);
        return matchesSchema.parse(parsedData);
      } catch (error) {
        console.error("Error fetching or parsing match data:", error);
        throw error;
      }
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        name: input.name,
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),
});
