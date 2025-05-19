import { matchesSchema, type Match } from "../models/matches";
import { MATCHES_API_URL } from "./constants/urls";
import { syncInningsForMatch } from "./utils/inningsSync";
import { unwrapJsonp } from "./utils/jsonp";

async function fetchMatchesFromApi(): Promise<Match[]> {
  const response = await fetch(MATCHES_API_URL);
  if (!response.ok) throw new Error("Failed to fetch matches data from API");
  const text = await response.text();
  const parsedData = matchesSchema.parse(unwrapJsonp(text));
  return parsedData.Matchsummary;
}

export default async function main(): Promise<void> {
  try {
    const apiMatches = await fetchMatchesFromApi();
    console.log(`Fetched ${apiMatches.length} matches from API.`);

    for (const match of apiMatches) {
      const matchId = match.MatchID;
      if (matchId && match.MatchStatus === "Live") {
        try {
          await syncInningsForMatch(String(matchId));
          console.log(`Innings synced for live match ${matchId}`);
        } catch (err) {
          console.error(
            `Failed to sync innings for live match ${matchId}:`,
            err,
          );
        }
      } else if (matchId) {
        console.log(
          `Skipping innings sync for match ${matchId} (Status from API: ${match.MatchStatus})`,
        );
      }
    }
    console.log("Finished processing matches for innings sync.");
  } catch (err) {
    console.error("Failed to fetch matches or process for innings sync:", err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});
