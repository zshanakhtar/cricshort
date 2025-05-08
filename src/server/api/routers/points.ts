import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { pointsSchema } from "~/models/points";

export const pointsRouter = createTRPCRouter({
  getPoints: publicProcedure.query(async () => {
    try {
      const response = await fetch(
        "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-groupstandings.js?ongroupstandings=_jqjsp&_1746742781756=",
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
        throw new Error("Failed to fetch points data");
      }
      const text = await response.text();
      // Remove 'ongroupstandings(' from start and last two chars from end
      const jsonStr = text.substring(17, text.length - 2);
      console.log(jsonStr);
      const parsedData = JSON.parse(jsonStr);
      const parsed = pointsSchema.parse(parsedData);
      return parsed.points;
    } catch (error) {
      console.error("Error fetching or parsing points data:", error);
      throw error;
    }
  }),
});
