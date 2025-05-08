import { z } from "zod";

export const battingCardSchema = z.object({
  MatchID: z.number(),
  InningsNo: z.number(),
  TeamID: z.number(),
  PlayerID: z.string(),
  PlayerName: z.string(),
  PlayerImage: z.string(),
  PlayingOrder: z.number().nullable(),
  MatchPlayingOrder: z.number(),
  BowlerName: z.string(),
  OutDesc: z.string(),
  ShortOutDesc: z.string(),
  Runs: z.number(),
  Balls: z.number(),
  DotBalls: z.number(),
  DotBallPercentage: z.string(),
  DotBallFrequency: z.string(),
  Ones: z.number(),
  Twos: z.number(),
  Threes: z.number(),
  Fours: z.number(),
  Sixes: z.number(),
  BoundaryPercentage: z.string(),
  BoundaryFrequency: z.string(),
  StrikeRate: z.string(),
  MinOver: z.number(),
  MinStrikerOver: z.number(),
  WicketNo: z.string().nullable(),
  AgainstFast: z.number(),
  AgainstSpin: z.number(),
  AgainstFastPercent: z.string(),
  AgainstSpinPercent: z.string(),
  PLAYER_ID: z.union([z.string(), z.number()]),
});

export const bowlingCardSchema = z.object({
  MatchID: z.number(),
  InningsNo: z.number(),
  TeamID: z.number(),
  PlayerID: z.string(),
  PlayerName: z.string(),
  PlayerShortName: z.string(),
  PlayerImageName: z.string(),
  PlayerImage: z.string(),
  Overs: z.union([z.number(), z.string()]),
  Maidens: z.number(),
  Runs: z.number(),
  Wickets: z.number(),
  Wides: z.number(),
  NoBalls: z.number(),
  Economy: z.union([z.number(), z.string()]),
  BowlingOrder: z.number(),
  TotalLegalBallsBowled: z.number(),
  ScoringBalls: z.number(),
  DotBalls: z.number(),
  DBPercent: z.string(),
  DBFrequency: z.string(),
  Ones: z.number(),
  Twos: z.number(),
  Threes: z.number(),
  Fours: z.number(),
  Sixes: z.number(),
  BdryPercent: z.string(),
  BdryFreq: z.string(),
  StrikeRate: z.union([z.string(), z.number()]),
  FourPercent: z.string(),
  SixPercent: z.string(),
});

export const inningsSchema = z.object({
  Innings2: z
    .object({
      BattingCard: z.array(battingCardSchema),
      BowlingCard: z.array(bowlingCardSchema).optional(),
    })
    .optional(),
  Innings1: z
    .object({
      BattingCard: z.array(battingCardSchema),
      BowlingCard: z.array(bowlingCardSchema).optional(),
    })
    .optional(),
});

export type BattingCard = z.infer<typeof battingCardSchema>;
export type BowlingCard = z.infer<typeof bowlingCardSchema>;
export type Innings = z.infer<typeof inningsSchema>;
