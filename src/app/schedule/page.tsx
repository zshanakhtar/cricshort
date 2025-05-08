import { api } from "~/trpc/server";
import Image from "next/image";

export default async function SchedulePage() {
  const matches = await api.matches.hello({ text: "Hello" });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Match Schedule</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button className="rounded-full bg-indigo-600 px-4 py-2 text-sm text-white">
          All Matches
        </button>
        <button className="rounded-full bg-white px-4 py-2 text-sm text-gray-600">
          Upcoming
        </button>
        <button className="rounded-full bg-white px-4 py-2 text-sm text-gray-600">
          Completed
        </button>
      </div>

      {/* Schedule List */}
      <div className="space-y-4">
        {matches.Matchsummary.filter((match) => match.MatchID).map((match) => (
          <div
            key={match.MatchID}
            className="rounded-lg bg-white p-4 shadow-md"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                {match.MatchOrder}
              </span>
              <span className="text-sm text-gray-500">
                {match.MatchDateNew} - {match.MatchTime} IST
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative h-10 w-10">
                  {/* <Image
                    src={match.HomeTeamLogo}
                    alt={match.HomeTeamName}
                    fill
                    className="object-contain"
                  /> */}
                </div>
                <span className="font-medium">{match.HomeTeamName}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-gray-500">VS</span>
                {match.MatchStatus === "Post" && (
                  <span className="mt-1 text-xs text-gray-500">
                    {match.Comments}
                  </span>
                )}
                {match.MatchStatus === "Live" && (
                  <span className="mt-1 text-xs font-semibold text-green-500">
                    LIVE
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-medium">{match.AwayTeamName}</span>
                <div className="relative h-10 w-10">
                  {/* <Image
                    src={match.AwayTeamLogo}
                    alt={match.AwayTeamName}
                    fill
                    className="object-contain"
                  /> */}
                </div>
              </div>
            </div>

            <div className="mt-2 text-center text-sm text-gray-500">
              {match.GroundName}, {match.city}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
