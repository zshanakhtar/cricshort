PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cricshort_batting_card` (
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
	`PLAYER_ID` integer,
	FOREIGN KEY (`MatchID`) REFERENCES `cricshort_matches`(`MatchID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_cricshort_batting_card`("id", "MatchID", "InningsNo", "TeamID", "PlayerID", "PlayerName", "PlayerImage", "PlayingOrder", "MatchPlayingOrder", "BowlerName", "OutDesc", "ShortOutDesc", "Runs", "Balls", "DotBalls", "DotBallPercentage", "DotBallFrequency", "Ones", "Twos", "Threes", "Fours", "Sixes", "BoundaryPercentage", "BoundaryFrequency", "StrikeRate", "MinOver", "MinStrikerOver", "WicketNo", "AgainstFast", "AgainstSpin", "AgainstFastPercent", "AgainstSpinPercent", "PLAYER_ID") SELECT "id", "MatchID", "InningsNo", "TeamID", "PlayerID", "PlayerName", "PlayerImage", "PlayingOrder", "MatchPlayingOrder", "BowlerName", "OutDesc", "ShortOutDesc", "Runs", "Balls", "DotBalls", "DotBallPercentage", "DotBallFrequency", "Ones", "Twos", "Threes", "Fours", "Sixes", "BoundaryPercentage", "BoundaryFrequency", "StrikeRate", "MinOver", "MinStrikerOver", "WicketNo", "AgainstFast", "AgainstSpin", "AgainstFastPercent", "AgainstSpinPercent", "PLAYER_ID" FROM `cricshort_batting_card`;--> statement-breakpoint
DROP TABLE `cricshort_batting_card`;--> statement-breakpoint
ALTER TABLE `__new_cricshort_batting_card` RENAME TO `cricshort_batting_card`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `batting_match_innings_team` ON `cricshort_batting_card` (`MatchID`,`InningsNo`,`TeamID`);