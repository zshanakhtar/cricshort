import { z } from "zod";

export const pointEntrySchema = z.object({
  StandingFlag: z.string().nullable(),
  Category: z.string().nullable(),
  CompetitionID: z.string().nullable(),
  TeamID: z.string().nullable(),
  TeamCode: z.string().nullable(),
  TeamName: z.string().nullable(),
  TeamLogo: z.string().nullable(),
  Matches: z.string().nullable(),
  Wins: z.string().nullable(),
  Loss: z.string().nullable(),
  Tied: z.string().nullable(),
  NoResult: z.string().nullable(),
  Points: z.string().nullable(),
  Draw: z.string().nullable(),
  ForTeams: z.string().nullable(),
  AgainstTeam: z.string().nullable(),
  NetRunRate: z.string().nullable(),
  Quotient: z.string().nullable(),
  OrderNo: z.string().nullable(),
  IsQualified: z.nullable(z.string()),
  LeadBy: z.string().nullable(),
  Deficit: z.string().nullable(),
  Performance: z.string().nullable(),
  Status: z.string().nullable(),
  MATCH_ID: z.string().nullable(),
  PrevPosition: z.string().nullable(),
});

export const pointsSchema = z.object({
  category: z.nullable(z.string()),
  points: z.array(pointEntrySchema),
});

export type PointEntry = z.infer<typeof pointEntrySchema>;
export type Points = z.infer<typeof pointsSchema>;
