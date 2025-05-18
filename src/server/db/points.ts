import { index, foreignKey } from "drizzle-orm/sqlite-core";
import { matches } from "./matches";
import { createTable } from "./tableCreator";

export const points = createTable(
  "points",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    StandingFlag: d.text(),
    Category: d.text(),
    CompetitionID: d.text(),
    TeamID: d.text(),
    TeamCode: d.text(),
    TeamName: d.text(),
    TeamLogo: d.text(),
    Matches: d.text(),
    Wins: d.text(),
    Loss: d.text(),
    Tied: d.text(),
    NoResult: d.text(),
    Points: d.text(),
    Draw: d.text(),
    ForTeams: d.text(),
    AgainstTeam: d.text(),
    NetRunRate: d.text(),
    Quotient: d.text(),
    OrderNo: d.text(),
    IsQualified: d.text(),
    LeadBy: d.text(),
    Deficit: d.text(),
    Performance: d.text(),
    Status: d.text(),
    MATCH_ID: d.text(),
    PrevPosition: d.text(),
  }),
  (t) => [
    index("points_competition_team").on(t.CompetitionID, t.TeamID),
    index("points_match").on(t.MATCH_ID),
    foreignKey({
      name: "fk_points_match_id",
      columns: [t.MATCH_ID],
      foreignColumns: [matches.MatchID],
    }),
  ],
);
