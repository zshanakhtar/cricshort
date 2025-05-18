import { api } from "~/trpc/server";
import { MatchCard } from "./_components/schedule/MatchCard";
import { MatchList } from "./_components/schedule/MatchList";
import { PointsTable } from "./_components/points/PointsTable";

export default async function SchedulePage() {
  const matches = await api.matches.getAllMatches();
  const points = await api.points.getPoints();

  const livematchData = (() => {
    const liveMatch = matches.Matchsummary.find(
      (match) => match.MatchStatus === "Live",
    );
    return liveMatch ? liveMatch : null;
  })();
  if (livematchData) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <MatchCard match={livematchData} clickable />
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col gap-6 justify-center">
      <PointsTable points={points} />
      <MatchList matches={matches} filter="upcoming" />
    </div>
  );
}
