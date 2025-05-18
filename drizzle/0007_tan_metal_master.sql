PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cricshort_extras` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`MatchID` text,
	`InningsNo` integer,
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
	`MaxPartnerShipRuns` integer,
	FOREIGN KEY (`MatchID`) REFERENCES `cricshort_matches`(`MatchID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_cricshort_extras`("id", "MatchID", "InningsNo", "TeamID", "Total", "TotalExtras", "Byes", "LegByes", "NoBalls", "Wides", "Penalty", "CurrentRunRate", "FallScore", "FallWickets", "FallOvers", "BattingTeamName", "BowlingTeamName", "MaxPartnerShipRuns") SELECT "id", "MatchID", "InningsNo", "TeamID", "Total", "TotalExtras", "Byes", "LegByes", "NoBalls", "Wides", "Penalty", "CurrentRunRate", "FallScore", "FallWickets", "FallOvers", "BattingTeamName", "BowlingTeamName", "MaxPartnerShipRuns" FROM `cricshort_extras`;--> statement-breakpoint
DROP TABLE `cricshort_extras`;--> statement-breakpoint
ALTER TABLE `__new_cricshort_extras` RENAME TO `cricshort_extras`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `extras_match_innings_team` ON `cricshort_extras` (`MatchID`,`InningsNo`,`TeamID`);--> statement-breakpoint
CREATE TABLE `__new_cricshort_partnership_score` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`MatchID` text,
	`BattingTeamID` text,
	`InningsNo` integer,
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
INSERT INTO `__new_cricshort_partnership_score`("id", "MatchID", "BattingTeamID", "InningsNo", "StrikerID", "Striker", "NonStrikerID", "NonStriker", "PartnershipTotal", "StrikerRuns", "StrikerBalls", "Extras", "NonStrikerRuns", "NonStrikerBalls", "MatchMaxOver", "MatchMinOver", "RowNumber") SELECT "id", "MatchID", "BattingTeamID", "InningsNo", "StrikerID", "Striker", "NonStrikerID", "NonStriker", "PartnershipTotal", "StrikerRuns", "StrikerBalls", "Extras", "NonStrikerRuns", "NonStrikerBalls", "MatchMaxOver", "MatchMinOver", "RowNumber" FROM `cricshort_partnership_score`;--> statement-breakpoint
DROP TABLE `cricshort_partnership_score`;--> statement-breakpoint
ALTER TABLE `__new_cricshort_partnership_score` RENAME TO `cricshort_partnership_score`;--> statement-breakpoint
CREATE INDEX `partnership_match_innings_team` ON `cricshort_partnership_score` (`MatchID`,`InningsNo`,`BattingTeamID`);