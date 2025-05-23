import { foreignKey, index } from "drizzle-orm/sqlite-core";
import { matches } from "./matches";
import { createTable } from "./tableCreator";

export const battingCard = createTable(
  "batting_card",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    MatchID: d.integer({ mode: "number" }),
    InningsNo: d.integer({ mode: "number" }),
    TeamID: d.integer({ mode: "number" }),
    PlayerID: d.text(),
    PlayerName: d.text(),
    PlayerImage: d.text(),
    PlayingOrder: d.integer({ mode: "number" }),
    MatchPlayingOrder: d.integer({ mode: "number" }),
    BowlerName: d.text(),
    OutDesc: d.text(),
    ShortOutDesc: d.text(),
    Runs: d.integer({ mode: "number" }),
    Balls: d.integer({ mode: "number" }),
    DotBalls: d.integer({ mode: "number" }),
    DotBallPercentage: d.text(),
    DotBallFrequency: d.text(),
    Ones: d.integer({ mode: "number" }),
    Twos: d.integer({ mode: "number" }),
    Threes: d.integer({ mode: "number" }),
    Fours: d.integer({ mode: "number" }),
    Sixes: d.integer({ mode: "number" }),
    BoundaryPercentage: d.text(),
    BoundaryFrequency: d.text(),
    StrikeRate: d.text(),
    MinOver: d.integer({ mode: "number" }),
    MinStrikerOver: d.integer({ mode: "number" }),
    WicketNo: d.text(),
    AgainstFast: d.integer({ mode: "number" }),
    AgainstSpin: d.integer({ mode: "number" }),
    AgainstFastPercent: d.text(),
    AgainstSpinPercent: d.text(),
    PLAYER_ID: d.integer({ mode: "number" }),
  }),
  (t) => [
    index("batting_match_innings_team").on(t.MatchID, t.InningsNo, t.TeamID),
    foreignKey({ columns: [t.MatchID], foreignColumns: [matches.MatchID] }),
  ],
);

// {
//         "MatchID": 1855,
//         "InningsNo": 2,
//         "TeamID": 16,
//         "PlayerID": "2021-100mb00000000583-8f4c0c4491dd11",
//         "PlayerName": "Vaibhav Arora",
//         "PlayerShortName": "Vaibhav Arora",
//         "PlayerImageName": "https:\/\/scores.iplt20.com\/ipl\/playerimages\/xJwqLrId4s1742551886583.png",
//         "PlayerImage": "https:\/\/scores.iplt20.com\/ipl\/playerimages\/xJwqLrId4s1742551886583.png",
//         "Overs": 3,
//         "Maidens": 0,
//         "Runs": 48,
//         "Wickets": 3,
//         "Wides": 2,
//         "NoBalls": 0,
//         "Economy": 16,
//         "BowlingOrder": 1,
//         "TotalLegalBallsBowled": 18,
//         "ScoringBalls": 13,
//         "DotBalls": 7,
//         "DBPercent": "38.89",
//         "DBFrequency": "2.57",
//         "Ones": 2,
//         "Twos": 1,
//         "Threes": 0,
//         "Fours": 3,
//         "Sixes": 5,
//         "BdryPercent": "87.50",
//         "BdryFreq": "2.25",
//         "StrikeRate": "6.00",
//         "FourPercent": "25.00",
//         "SixPercent": "62.50"
//       },

export const bowlingCard = createTable(
  "bowling_card",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    MatchID: d.integer({ mode: "number" }),
    InningsNo: d.integer({ mode: "number" }),
    TeamID: d.integer({ mode: "number" }),
    PlayerID: d.text(),
    PlayerName: d.text(),
    PlayerShortName: d.text(),
    PlayerImageName: d.text(),
    PlayerImage: d.text(),
    Overs: d.integer({ mode: "number" }),
    Maidens: d.integer({ mode: "number" }),
    Runs: d.integer({ mode: "number" }),
    Wickets: d.integer({ mode: "number" }),
    Wides: d.integer({ mode: "number" }),
    NoBalls: d.integer({ mode: "number" }),
    Economy: d.integer({ mode: "number" }),
    BowlingOrder: d.integer({ mode: "number" }),
    TotalLegalBallsBowled: d.integer({ mode: "number" }),
    ScoringBalls: d.integer({ mode: "number" }),
    DotBalls: d.integer({ mode: "number" }),
    DBPercent: d.text(),
    DBFrequency: d.text(),
    Ones: d.integer({ mode: "number" }),
    Twos: d.integer({ mode: "number" }),
    Threes: d.integer({ mode: "number" }),
    Fours: d.integer({ mode: "number" }),
    Sixes: d.integer({ mode: "number" }),
    BdryPercent: d.text(),
    BdryFreq: d.text(),
    StrikeRate: d.text(),
    FourPercent: d.text(),
    SixPercent: d.text(),
  }),
  (t) => [
    index("bowling_match_innings_team").on(t.MatchID, t.InningsNo, t.TeamID),
    foreignKey({ columns: [t.MatchID], foreignColumns: [matches.MatchID] }),
  ],
);

// {
//         "MatchID": "1855",
//         "InningsNo": 2,
//         "TeamID": "13",
//         "Total": "183\/8 (19.4 Overs)",
//         "TotalExtras": "5",
//         "Byes": "0",
//         "LegByes": "1",
//         "NoBalls": "0",
//         "Wides": "4",
//         "Penalty": "",
//         "CurrentRunRate": "9.31",
//         "FallScore": "183",
//         "FallWickets": "8",
//         "FallOvers": "19.4",
//         "BattingTeamName": "Chennai Super Kings",
//         "BowlingTeamName": "Kolkata Knight Riders",
//         "MaxPartnerShipRuns": 67
//       }

export const extras = createTable(
  "extras",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    MatchID: d.text(),
    InningsNo: d.integer({ mode: "number" }),
    TeamID: d.text(),
    Total: d.text(),
    TotalExtras: d.text(),
    Byes: d.text(),
    LegByes: d.text(),
    NoBalls: d.text(),
    Wides: d.text(),
    Penalty: d.text(),
    CurrentRunRate: d.text(),
    FallScore: d.text(),
    FallWickets: d.text(),
    FallOvers: d.text(),
    BattingTeamName: d.text(),
    BowlingTeamName: d.text(),
    MaxPartnerShipRuns: d.integer({ mode: "number" }),
  }),
  (t) => [
    index("extras_match_innings_team").on(t.MatchID, t.InningsNo, t.TeamID),
    foreignKey({ columns: [t.MatchID], foreignColumns: [matches.MatchID] }),
  ],
);

// {
//         "MatchID": 1855,
//         "BattingTeamID": 13,
//         "InningsNo": 2,
//         "StrikerID": "2024-100mb00000003497-dc521b85a24811",
//         "Striker": "Ayush Mhatre",
//         "NonStrikerID": "2021-100mb00000000601-517399b0ceaf11",
//         "PartnershipTotal": 0,
//         "StrikerRuns": 0,
//         "StrikerBalls": 2,
//         "Extras": 0,
//         "NonStrikerRuns": 0,
//         "NonStrikerBalls": 0,
//         "MatchMaxOver": 0.2,
//         "MatchMinOver": 0.1,
//         "NonStriker": "Devon Conway",
//         "@I := 0": "0",
//         "RowNumber": 1
//       },

export const partnershipScore = createTable(
  "partnership_score",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    MatchID: d.integer({ mode: "number" }),
    BattingTeamID: d.integer({ mode: "number" }),
    InningsNo: d.integer({ mode: "number" }),
    StrikerID: d.text(),
    Striker: d.text(),
    NonStrikerID: d.text(),
    NonStriker: d.text(),
    PartnershipTotal: d.integer({ mode: "number" }),
    StrikerRuns: d.integer({ mode: "number" }),
    StrikerBalls: d.integer({ mode: "number" }),
    Extras: d.integer({ mode: "number" }),
    NonStrikerRuns: d.integer({ mode: "number" }),
    NonStrikerBalls: d.integer({ mode: "number" }),
    MatchMaxOver: d.integer({ mode: "number" }),
    MatchMinOver: d.integer({ mode: "number" }),
    RowNumber: d.integer({ mode: "number" }),
  }),
  (t) => [
    index("partnership_match_innings_team").on(
      t.MatchID,
      t.InningsNo,
      t.BattingTeamID,
    ),
    foreignKey({ columns: [t.MatchID], foreignColumns: [matches.MatchID] }),
  ],
);

// {
//         "BallID": "A96A791D-F47E-474D-9579-05E45B1DC886",
//         "BallUniqueID": "625714",
//         "ActualBallNo": "1",
//         "MatchID": "1855",
//         "InningsNo": 2,
//         "BattingTeamID": "13",
//         "TeamName": "Chennai Super Kings",
//         "StrikerID": "2024-100mb00000003497-dc521b85a24811",
//         "NonStrikerID": "2021-100mb00000000601-517399b0ceaf11",
//         "BatsManName": "Ayush Mhatre",
//         "BowlerID": "2021-100mb00000000583-8f4c0c4491dd11",
//         "BowlerName": "Vaibhav Arora",
//         "BowlerType": "",
//         "OverNo": 1,
//         "OverName": "One",
//         "BallNo": "1",
//         "Runs": "0",
//         "BallRuns": "0",
//         "RunsText": "Zero",
//         "ActualRuns": "0",
//         "IsOne": "0",
//         "IsTwo": "0",
//         "IsThree": "0",
//         "IsDotball": "1",
//         "Extras": "0",
//         "IsWide": "0",
//         "IsNoBall": "0",
//         "IsBye": "0",
//         "IsLegBye": "0",
//         "IsFour": "0",
//         "IsSix": "0",
//         "IsWicket": "0",
//         "WicketType": "",
//         "Wickets": "",
//         "VideoFile": "KKRVSCSK07052025-CSK-Inn2-Over1-Ball1.mp4",
//         "IsBowlerWicket": "0",
//         "CommentOver": "Over 0.1",
//         "BallName": "0.1",
//         "CommentStrikers": "Vaibhav Arora TO Ayush Mhatre",
//         "NewCommentry": "Vaibhav Arora to Ayush Mhatre - DOT BALL !!!",
//         "Commentry": "Vaibhav Arora bowling to Ayush Mhatre, good length ball, pitching outside off stump, Ayush Mhatre plays a defensive shot on back foot, no run towards Cover Point",
//         "UPDCommentry": "Vaibhav Arora bowling to Ayush Mhatre, good length ball, pitching outside off stump, Ayush Mhatre plays a defensive shot on back foot, no run towards Cover Point",
//         "Day": "1",
//         "SESSION_NO": "1",
//         "IsExtra": "0",
//         "OutBatsManID": "",
//         "SNO": "625714",
//         "Xpitch": "-93.50",
//         "Ypitch": "14.50",
//         "RunRuns": "0",
//         "IsMaiden": "0",
//         "OverImage": "",
//         "BowlTypeID": "41",
//         "BowlTypeName": "INSWINGER",
//         "ShotTypeID": "50",
//         "ShotType": "BACKFOOT DEFENCE",
//         "IsBouncer": "0",
//         "IsFreeHit": "0",
//         "BallCount": "1",
//         "BCCheck": "0",
//         "TotalRuns": "0",
//         "TotalWickets": "0",
//         "BOWLING_LINE_ID": "Outside Off stump",
//         "BOWLING_LENGTH_ID": "Good Length",
//         "FiveHaul": "1",
//         "HatCheck": "2021-100mb00000000583-8f4c0c4491dd11 - 0",
//         "Flag": "0",
//         "FlagSet": "0",
//         "PenaltyRuns": "0",
//         "IsFifty": "0",
//         "IsHundred": "0",
//         "IsTwoHundred": "0",
//         "IsHattrick": "0"
//       },
export const ballByBall = createTable(
  "ball_by_ball",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    BallID: d.text(),
    BallUniqueID: d.text(),
    ActualBallNo: d.text(),
    MatchID: d.text(),
    InningsNo: d.integer({ mode: "number" }),
    BattingTeamID: d.text(),
    TeamName: d.text(),
    StrikerID: d.text(),
    NonStrikerID: d.text(),
    BatsManName: d.text(),
    BowlerID: d.text(),
    BowlerName: d.text(),
    BowlerType: d.text(),
    OverNo: d.integer({ mode: "number" }),
    OverName: d.text(),
    BallNo: d.text(),
    Runs: d.text(),
    BallRuns: d.text(),
    RunsText: d.text(),
    ActualRuns: d.text(),
    IsOne: d.text(),
    IsTwo: d.text(),
    IsThree: d.text(),
    IsDotball: d.text(),
    Extras: d.text(),
    IsWide: d.text(),
    IsNoBall: d.text(),
    IsBye: d.text(),
    IsLegBye: d.text(),
    IsFour: d.text(),
    IsSix: d.text(),
    IsWicket: d.text(),
    WicketType: d.text(),
    Wickets: d.text(),
    VideoFile: d.text(),
    IsBowlerWicket: d.text(),
    CommentOver: d.text(),
    BallName: d.text(),
    CommentStrikers: d.text(),
    NewCommentry: d.text(),
    Commentry: d.text(),
    UPDCommentry: d.text(),
    Day: d.text(),
    SESSION_NO: d.text(),
    IsExtra: d.text(),
    OutBatsManID: d.text(),
    SNO: d.text(),
    Xpitch: d.text(),
    Ypitch: d.text(),
    RunRuns: d.text(),
    IsMaiden: d.text(),
    OverImage: d.text(),
    BowlTypeID: d.text(),
    BowlTypeName: d.text(),
    ShotTypeID: d.text(),
    ShotType: d.text(),
    IsBouncer: d.text(),
    IsFreeHit: d.text(),
    BallCount: d.text(),
    BCCheck: d.text(),
    TotalRuns: d.text(),
    TotalWickets: d.text(),
    BOWLING_LINE_ID: d.text(),
    BOWLING_LENGTH_ID: d.text(),
    FiveHaul: d.text(),
    HatCheck: d.text(),
    Flag: d.text(),
    FlagSet: d.text(),
    PenaltyRuns: d.text(),
    IsFifty: d.text(),
    IsHundred: d.text(),
    IsTwoHundred: d.text(),
    IsHattrick: d.text(),
  }),
  (t) => [
    index("ball_match_innings_team").on(
      t.MatchID,
      t.InningsNo,
      t.BattingTeamID,
    ),
    foreignKey({ columns: [t.MatchID], foreignColumns: [matches.MatchID] }),
  ],
);
