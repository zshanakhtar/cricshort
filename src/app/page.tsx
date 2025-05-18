import { api } from "~/trpc/server";
import { PointsTable } from "./_components/points/PointsTable";
import { MatchCard } from "./_components/schedule/MatchCard";
import { MatchList } from "./_components/schedule/MatchList";

export default async function SchedulePage() {
  const matches = await api.matches.getAllMatches();
  const points = await api.points.getPoints();

  const livematchData = (() => {
    const liveMatch = matches.Matchsummary.find(
      (match) => match.MatchStatus === "Live",
    );
    return liveMatch ?? null;
  })();
  if (livematchData) {
    return (
      <div className="flex h-full w-full flex-col justify-center gap-6">
        <MatchCard match={livematchData} clickable />
        <PointsTable points={points} />
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col justify-center gap-6">
      <PointsTable points={points} />
      <MatchList matches={matches} filter="upcoming" />
    </div>
  );
}
