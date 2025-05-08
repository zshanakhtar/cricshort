import { z } from "zod";

export const pointEntrySchema = z.object({
  StandingFlag: z.string(),
  Category: z.nullable(z.string()),
  CompetitionID: z.string(),
  TeamID: z.string(),
  TeamCode: z.string(),
  TeamName: z.string(),
  TeamLogo: z.string(),
  Matches: z.string(),
  Wins: z.string(),
  Loss: z.string(),
  Tied: z.string(),
  NoResult: z.string(),
  Points: z.string(),
  Draw: z.string(),
  ForTeams: z.string(),
  AgainstTeam: z.string(),
  NetRunRate: z.string(),
  Quotient: z.string(),
  OrderNo: z.string(),
  IsQualified: z.nullable(z.string()),
  LeadBy: z.string(),
  Deficit: z.string(),
  Performance: z.string(),
  Status: z.string(),
  MATCH_ID: z.string(),
  PrevPosition: z.string(),
});

export const pointsSchema = z.object({
  category: z.nullable(z.string()),
  points: z.array(pointEntrySchema),
});

export type PointEntry = z.infer<typeof pointEntrySchema>;
export type Points = z.infer<typeof pointsSchema>;
