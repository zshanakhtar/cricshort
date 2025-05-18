import { api } from "~/trpc/server";
import { ScheduleClient } from "./_components/schedule/ScheduleClient";
import { MatchCard } from "./_components/schedule/MatchCard";

export default async function SchedulePage() {
  const matches = await api.matches.getAllMatches();
  const livematchData =
    //   useMemo(() => {
    (() => {
      const liveMatch = matches.Matchsummary.find(
        (match) => match.MatchStatus === "Live",
      );
      return liveMatch ? liveMatch : null;
    })();
  //   , [matches]);
  if (livematchData) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <MatchCard match={livematchData} clickable />
      </div>
    );
  }
  return (
  <>
  <ScheduleClient matches={matches} />
  </>
    );
}
