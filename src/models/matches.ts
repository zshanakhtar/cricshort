import { z } from "zod";

export const matchSchema = z.object({
  MatchID: z.number(),
  CompetitionID: z.number().nullable(),
  MatchTypeID: z.number().nullable(),
  MatchType: z.string().nullable(),
  MatchStatus: z.string().nullable(),
  MatchDate: z.string().nullable(),
  MatchDateNew: z.string().nullable(),
  MatchName: z.string().nullable(),
  MatchTime: z.string().nullable(),
  HomeTeamID: z.number().nullable(),
  HomeTeamName: z.string().nullable(),
  HomeTeamLogo: z.string().nullable(),
  AwayTeamID: z.number().nullable(),
  AwayTeamName: z.string().nullable(),
  AwayTeamLogo: z.string().nullable(),
  GroundName: z.string().nullable(),
  city: z.string().nullable(),
  Comments: z.string().nullable(),
  FirstBattingSummary: z.string().nullable(),
  SecondInningsFirstBattingID: z.number().nullable(),
  SecondInningsSecondBattingID: z.number().nullable(),
  WinningTeamID: z.number().nullable(),
  MatchOrder: z.string().nullable(),
});

export const matchesSchema = z.object({
  Matchsummary: z.array(matchSchema),
});

export type Match = z.infer<typeof matchSchema>;
export type Matches = z.infer<typeof matchesSchema>;
