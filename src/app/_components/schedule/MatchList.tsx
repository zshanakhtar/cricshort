import { useMemo } from "react";
import { type Match, type Matches } from "~/models/matches";
import { MatchCard } from "./MatchCard";

interface MatchListProps {
  matches: Matches;
  filter: "all" | "upcoming" | "completed";
}

export const MatchList = ({ matches, filter }: MatchListProps) => {
  const processedMatches = useMemo(
    () =>
      matches.Matchsummary.map((match) => ({
        ...match,
        MatchName: match.MatchName ?? "Unknown Match",
        MatchDate: match.MatchDate ?? "Unknown Date",
      })),
    [matches],
  );

  const filteredMatches = useMemo(() => {
    return processedMatches.filter((match) => {
      const matchDate = match.MatchDateNew ?? match.MatchDate;
      if (!matchDate) return false;
      switch (filter) {
        case "completed":
          return match.MatchStatus === "Post";
        case "upcoming":
          return match.MatchStatus === "UpComing";
        default:
          return true;
      }
    });
  }, [processedMatches, filter]);

  const sortedMatches = useMemo(() => {
    return [...filteredMatches].sort((a, b) => {
      const aDate = a.MatchDateNew ?? a.MatchDate ?? "";
      const bDate = b.MatchDateNew ?? b.MatchDate ?? "";
      const aTime = new Date(aDate).getTime();
      const bTime = new Date(bDate).getTime();

      if (isNaN(aTime) && isNaN(bTime)) return 0;
      if (isNaN(aTime)) return 1;
      if (isNaN(bTime)) return -1;

      return filter === "completed" ? bTime - aTime : aTime - bTime;
    });
  }, [filteredMatches, filter]);

  const groupedMatches = useMemo(() => {
    return sortedMatches.reduce<Record<string, Match[]>>((acc, match) => {
      const matchDate = match.MatchDateNew ?? match.MatchDate;
      const validDate =
        matchDate && !isNaN(new Date(matchDate).getTime())
          ? matchDate
          : "No Date";

      return {
        ...acc,
        [validDate]: [...(acc[validDate] ?? []), match],
      };
    }, {});
  }, [sortedMatches]);

  return (
    <div className="space-y-6">
      {Object.entries(groupedMatches).map(([date, matches]) => (
        <div key={date} className="space-y-4">
          <div className="flex w-full items-center gap-2">
            <span className="text-secondary-light-50 dark:text-secondary-dark-800 text-lg font-semibold whitespace-nowrap">
              {date}
            </span>
            <div
              className="bg-secondary-light-800 dark:bg-secondary-dark-950 h-px flex-1"
              style={{ minWidth: 0 }}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {matches.map((match) => (
              <MatchCard
                key={match.MatchID}
                match={match}
                clickable={match.MatchStatus !== "UpComing"}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
