CREATE TABLE `cricshort_matches` (
	`MatchID` integer PRIMARY KEY NOT NULL,
	`CompetitionID` integer,
	`MatchTypeID` integer,
	`MatchType` text,
	`MatchStatus` text,
	`MatchDate` text,
	`MatchDateNew` text,
	`MatchName` text,
	`MatchTime` text,
	`GMTMatchTime` text,
	`GMTMatchDate` text,
	`GMTMatchEndTime` text,
	`GMTMatchEndDate` text,
	`FirstBattingTeamID` integer,
	`FirstBattingTeamName` text,
	`SecondBattingTeamID` integer,
	`SecondBattingTeamName` text,
	`FirstBattingTeamCode` text,
	`SecondBattingTeamCode` text,
	`GroundID` integer,
	`GroundName` text,
	`Commentss` text,
	`TossTeam` text,
	`TossDetails` text,
	`TossText` text,
	`Flag` integer,
	`FirstBattingSummary` text,
	`SecondBattingSummary` text,
	`ClientMatchID` text,
	`MATCH_COMMENCE_START_DATE` text,
	`city` text,
	`FlickrAlbumID` text,
	`LiveStream` text,
	`FBURL` text,
	`T20ProMatchID` text,
	`Temperature` text,
	`WeatherIcon` text,
	`TempUpdatedDate` text,
	`GroundUmpire1ID` integer,
	`GroundUmpire2ID` integer,
	`GroundUmpire3ID` integer,
	`RefereeID` integer,
	`HomeTeamID` text,
	`HomeTeamName` text,
	`HomeTeamColor1` text,
	`HomeTeamColor2` text,
	`AwayTeamColor1` text,
	`AwayTeamColor2` text,
	`AwayTeamID` text,
	`AwayTeamName` text,
	`timezone1` text,
	`MatchEndDate` text,
	`MatchEndTime` text,
	`MATCH_NO_OF_OVERS` text,
	`ROUND_ID` text,
	`MatchTypeName` text,
	`RowNo` integer,
	`TeamType` text,
	`CompetitionName` text,
	`GroundUmpire1` text,
	`GroundUmpire2` text,
	`ThirdUmpire` text,
	`Comments` text,
	`HomeTeamLogo` text,
	`AwayTeamLogo` text,
	`MatchHomeTeamLogo` text,
	`MatchAwayTeamLogo` text,
	`VideoScorecard` integer,
	`TimeZone` text,
	`CurrentStrikerID` text,
	`CurrentStrikerName` text,
	`StrikerRuns` integer,
	`StrikerBalls` integer,
	`StrikerFours` integer,
	`StrikerSixes` integer,
	`StrikerSR` integer,
	`StrikerImage` text,
	`CurrentNonStrikerID` text,
	`CurrentNonStrikerName` text,
	`NonStrikerRuns` integer,
	`NonStrikerBalls` integer,
	`NonStrikerFours` integer,
	`NonStrikerSixes` integer,
	`NonStrikerSR` integer,
	`NonStrikerImage` text,
	`CurrentBowlerID` text,
	`CurrentBowlerName` text,
	`BowlerOvers` text,
	`BowlerRuns` integer,
	`BowlerMaidens` integer,
	`BowlerWickets` integer,
	`BowlerEconomy` integer,
	`BowlerSR` integer,
	`BowlerImage` text,
	`ChasingText` text,
	`MatchBreakComments` text,
	`MatchProgress` text,
	`CurrentInnings` text,
	`1Summary` text,
	`1FallScore` text,
	`1FallWickets` text,
	`1FallOvers` text,
	`1RunRate` text,
	`2Summary` text,
	`2FallScore` text,
	`2FallWickets` text,
	`2FallOvers` text,
	`2RunRate` text,
	`3Summary` text,
	`3FallScore` text,
	`3FallWickets` text,
	`3FallOvers` text,
	`3RunRate` text,
	`4Summary` text,
	`4FallScore` text,
	`4FallWickets` text,
	`4FallOvers` text,
	`4RunRate` text,
	`5Summary` text,
	`5FallScore` text,
	`5FallWickets` text,
	`5FallOvers` text,
	`5RunRate` text,
	`6Summary` text,
	`6FallScore` text,
	`6FallWickets` text,
	`6FallOvers` text,
	`6RunRate` text,
	`DivisionID` text,
	`SecondInningsFirstBattingID` text,
	`SecondInningsFirstBattingName` text,
	`SecondInningsSecondBattingID` text,
	`SecondInningsSecondBattingName` text,
	`ThirdInningsFirstBattingID` integer,
	`ThirdInningsFirstBattingName` text,
	`ThirdInningsSecondBattingID` integer,
	`ThirdInningsSecondBattingName` text,
	`WinningTeamID` text,
	`MatchOrder` text,
	`RevisedOver` text,
	`RevisedTarget` text,
	`PreMatchCommentary` text,
	`PostMatchCommentary` text,
	`MatchRow` integer,
	`ProjectedScore` text,
	`2ndProjectedScore` text,
	`3rdProjectedScore` text,
	`MOM` text,
	`MOM_TYPE` text,
	`MOMPlayerId` text,
	`MOMRuns` text,
	`MOMBalls` text,
	`MOMWicket` text,
	`MOMRC` text,
	`MOMImage` text,
	`KO` text
);
--> statement-breakpoint
CREATE INDEX `MatchID_idx` ON `cricshort_matches` (`MatchID`);--> statement-breakpoint
CREATE TABLE `cricshort_batting_card` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`MatchID` integer,
	`InningsNo` integer,
	`TeamID` integer,
	`PlayerID` text,
	`PlayerName` text,
	`PlayerImage` text,
	`PlayingOrder` integer,
	`MatchPlayingOrder` integer,
	`BowlerName` text,
	`OutDesc` text,
	`ShortOutDesc` text,
	`Runs` integer,
	`Balls` integer,
	`DotBalls` integer,
	`DotBallPercentage` text,
	`DotBallFrequency` text,
	`Ones` integer,
	`Twos` integer,
	`Threes` integer,
	`Fours` integer,
	`Sixes` integer,
	`BoundaryPercentage` text,
	`BoundaryFrequency` text,
	`StrikeRate` text,
	`MinOver` integer,
	`MinStrikerOver` integer,
	`WicketNo` text,
	`AgainstFast` integer,
	`AgainstSpin` integer,
	`AgainstFastPercent` text,
	`AgainstSpinPercent` text,
	`PLAYER_ID` text,
	FOREIGN KEY (`MatchID`) REFERENCES `cricshort_matches`(`MatchID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `batting_match_innings_team` ON `cricshort_batting_card` (`MatchID`,`InningsNo`,`TeamID`);--> statement-breakpoint
CREATE TABLE `cricshort_bowling_card` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`MatchID` integer,
	`InningsNo` integer,
	`TeamID` integer,
	`PlayerID` text,
	`PlayerName` text,
	`PlayerShortName` text,
	`PlayerImageName` text,
	`PlayerImage` text,
	`Overs` text,
	`Maidens` integer,
	`Runs` integer,
	`Wickets` integer,
	`Wides` integer,
	`NoBalls` integer,
	`Economy` text,
	`BowlingOrder` integer,
	`TotalLegalBallsBowled` integer,
	`ScoringBalls` integer,
	`DotBalls` integer,
	`DBPercent` text,
	`DBFrequency` text,
	`Ones` integer,
	`Twos` integer,
	`Threes` integer,
	`Fours` integer,
	`Sixes` integer,
	`BdryPercent` text,
	`BdryFreq` text,
	`StrikeRate` text,
	`FourPercent` text,
	`SixPercent` text,
	FOREIGN KEY (`MatchID`) REFERENCES `cricshort_matches`(`MatchID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `bowling_match_innings_team` ON `cricshort_bowling_card` (`MatchID`,`InningsNo`,`TeamID`);--> statement-breakpoint
CREATE TABLE `cricshort_extras` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`MatchID` text,
	`InningsNo` text,
	`TeamID` text,
	`Total` text,
	`TotalExtras` text,
	`Byes` text,
	`LegByes` text,
	`NoBalls` text,
	`Wides` text,
	`Penalty` text,
	`CurrentRunRate` text,
	`FallScore` text,
	`FallWickets` text,
	`FallOvers` text,
	`BattingTeamName` text,
	`BowlingTeamName` text,
	`MaxPartnerShipRuns` text,
	FOREIGN KEY (`MatchID`) REFERENCES `cricshort_matches`(`MatchID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `extras_match_innings_team` ON `cricshort_extras` (`MatchID`,`InningsNo`,`TeamID`);--> statement-breakpoint
CREATE TABLE `cricshort_partnership_score` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`MatchID` text,
	`BattingTeamID` text,
	`InningsNo` text,
	`StrikerID` text,
	`Striker` text,
	`NonStrikerID` text,
	`NonStriker` text,
	`PartnershipTotal` text,
	`StrikerRuns` text,
	`StrikerBalls` text,
	`Extras` text,
	`NonStrikerRuns` text,
	`NonStrikerBalls` text,
	`MatchMaxOver` text,
	`MatchMinOver` text,
	`RowNumber` text,
	FOREIGN KEY (`MatchID`) REFERENCES `cricshort_matches`(`MatchID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `partnership_match_innings_team` ON `cricshort_partnership_score` (`MatchID`,`InningsNo`,`BattingTeamID`);--> statement-breakpoint
CREATE TABLE `cricshort_points` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`StandingFlag` text,
	`Category` text,
	`CompetitionID` text,
	`TeamID` text,
	`TeamCode` text,
	`TeamName` text,
	`TeamLogo` text,
	`Matches` text,
	`Wins` text,
	`Loss` text,
	`Tied` text,
	`NoResult` text,
	`Points` text,
	`Draw` text,
	`ForTeams` text,
	`AgainstTeam` text,
	`NetRunRate` text,
	`Quotient` text,
	`OrderNo` text,
	`IsQualified` text,
	`LeadBy` text,
	`Deficit` text,
	`Performance` text,
	`Status` text,
	`MATCH_ID` text,
	`PrevPosition` text,
	FOREIGN KEY (`MATCH_ID`) REFERENCES `cricshort_matches`(`MatchID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `points_competition_team` ON `cricshort_points` (`CompetitionID`,`TeamID`);--> statement-breakpoint
CREATE INDEX `points_match` ON `cricshort_points` (`MATCH_ID`);