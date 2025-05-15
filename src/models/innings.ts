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
  PLAYER_ID: z.string(), // Changed to string only since DB expects string
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
  Overs: z.string(), // Changed to string only to match DB
  Maidens: z.number(),
  Runs: z.number(),
  Wickets: z.number(),
  Wides: z.number(),
  NoBalls: z.number(),
  Economy: z.string(), // Changed to string only to match DB
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
  StrikeRate: z.string(), // Changed to string only to match DB
  FourPercent: z.string(),
  SixPercent: z.string(),
});

export const extrasSchema = z.object({
  MatchID: z.string(), // Changed to string only to match DB
  InningsNo: z.string(), // Changed to string only to match DB
  TeamID: z.string(), // Changed to string only to match DB
  Total: z.string(),
  TotalExtras: z.string(),
  Byes: z.string(),
  LegByes: z.string(),
  NoBalls: z.string(),
  Wides: z.string(),
  Penalty: z.string(),
  CurrentRunRate: z.string(),
  FallScore: z.string(),
  FallWickets: z.string(), // Changed to string only to match DB
  FallOvers: z.string(),
  BattingTeamName: z.string(),
  BowlingTeamName: z.string(),
  MaxPartnerShipRuns: z.string(), // Changed to string only to match DB
});

export const partnershipScoreSchema = z.object({
  MatchID: z.string(), // Changed to string only to match DB
  BattingTeamID: z.string(), // Changed to string only to match DB
  InningsNo: z.string(), // Changed to string only to match DB
  StrikerID: z.string(),
  Striker: z.string(),
  NonStrikerID: z.string(),
  NonStriker: z.string(),
  PartnershipTotal: z.string(), // Changed to string only to match DB
  StrikerRuns: z.string(), // Changed to string only to match DB
  StrikerBalls: z.string(), // Changed to string only to match DB
  Extras: z.string(), // Changed to string only to match DB
  NonStrikerRuns: z.string(), // Changed to string only to match DB
  NonStrikerBalls: z.string(), // Changed to string only to match DB
  MatchMaxOver: z.string(), // Changed to string only to match DB
  MatchMinOver: z.string(), // Changed to string only to match DB
  RowNumber: z.string(), // Changed to string only to match DB
});

export const inningsSchema = z.object({
  Innings2: z
    .object({
      BattingCard: z.array(battingCardSchema),
      BowlingCard: z.array(bowlingCardSchema).optional(),
      Extras: z.array(extrasSchema).optional(),
      PartnershipScores: z.array(partnershipScoreSchema).optional(),
    })
    .optional(),
  Innings1: z
    .object({
      BattingCard: z.array(battingCardSchema),
      BowlingCard: z.array(bowlingCardSchema).optional(),
      Extras: z.array(extrasSchema).optional(),
      PartnershipScores: z.array(partnershipScoreSchema).optional(),
    })
    .optional(),
});

export type BattingCard = z.infer<typeof battingCardSchema>;
export type BowlingCard = z.infer<typeof bowlingCardSchema>;
export type Innings = z.infer<typeof inningsSchema>;
export type Extras = z.infer<typeof extrasSchema>;
export type PartnershipScore = z.infer<typeof partnershipScoreSchema>;
