PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cricshort_partnership_score` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`MatchID` integer,
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
	`NonStrikerBalls` integer,
	`MatchMaxOver` text,
	`MatchMinOver` integer,
	`RowNumber` integer,
	FOREIGN KEY (`MatchID`) REFERENCES `cricshort_matches`(`MatchID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_cricshort_partnership_score`("id", "MatchID", "BattingTeamID", "InningsNo", "StrikerID", "Striker", "NonStrikerID", "NonStriker", "PartnershipTotal", "StrikerRuns", "StrikerBalls", "Extras", "NonStrikerRuns", "NonStrikerBalls", "MatchMaxOver", "MatchMinOver", "RowNumber") SELECT "id", "MatchID", "BattingTeamID", "InningsNo", "StrikerID", "Striker", "NonStrikerID", "NonStriker", "PartnershipTotal", "StrikerRuns", "StrikerBalls", "Extras", "NonStrikerRuns", "NonStrikerBalls", "MatchMaxOver", "MatchMinOver", "RowNumber" FROM `cricshort_partnership_score`;--> statement-breakpoint
DROP TABLE `cricshort_partnership_score`;--> statement-breakpoint
ALTER TABLE `__new_cricshort_partnership_score` RENAME TO `cricshort_partnership_score`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `partnership_match_innings_team` ON `cricshort_partnership_score` (`MatchID`,`InningsNo`,`BattingTeamID`);