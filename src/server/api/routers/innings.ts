import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { inningsSchema } from "~/models/innings";
import { z } from "zod";

export const inningsRouter = createTRPCRouter({
  getInnings: publicProcedure
    .input(z.object({ matchId: z.string(), innings: z.enum(["1", "2"]) }))
    .query(async ({ input }) => {
      try {
        const response = await fetch(
          input.innings==="1"?
          `https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/${input.matchId}-Innings1.js?onScoring=_jqjsp&_1746730532635=`
          :`https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/${input.matchId}-Innings2.js?callback=onScoring&_=1746729843775`,
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
          throw new Error("Failed to fetch innings data");
        }

        const text = await response.text();
        // Remove 'onScoring(' from start and last two chars from end
        const jsonStr = text.substring(10, text.length - 2);
        const parsed = JSON.parse(jsonStr);
        return inningsSchema.parse(parsed);
      } catch (error) {
        console.error("Error fetching or parsing innings data:", error);
        throw error;
      }
    }),
});
