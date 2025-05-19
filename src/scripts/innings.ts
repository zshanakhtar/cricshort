import { matchesSchema, type Matches } from "../models/matches";
import { db } from "../server/db/index";
import { matches } from "../server/db/matches";
import { syncInningsForMatch } from "./utils/inningsSync";

async function getAllMatchesFromDb(): Promise<Matches> {
  const result = await db.select().from(matches);
  return matchesSchema.parse({ Matchsummary: result });
}

export default async function main(): Promise<void> {
  const matchesList = await getAllMatchesFromDb();
  for (const match of matchesList.Matchsummary) {
    const matchId = match.MatchID;
    if (!matchId) continue;
    try {
      await syncInningsForMatch(String(matchId));
      console.log(`Innings synced for match ${matchId}`);
    } catch (err) {
      console.error(`Failed to sync innings for match ${matchId}:`, err);
    }
  }
}

main().catch((err) => {
  console.error("Failed to sync innings:", err);
  process.exit(1);
});
