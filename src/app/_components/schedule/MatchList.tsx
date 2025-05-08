import { useMemo } from "react";
import { type Match } from "~/models/matches";
import { MatchCard } from "./MatchCard";

interface MatchListProps {
  matches: Match[];
  filter: "all" | "upcoming" | "completed";
}

export const MatchList = ({ matches, filter }: MatchListProps) => {
  const filteredMatches = useMemo(() => {
    if (filter === "all") {
      return matches;
    } else if (filter === "completed") {
      return matches.filter(
        (match) => new Date(match.MatchDateNew) < new Date(),
      );
    } else if (filter === "upcoming") {
      return matches.filter(
        (match) => new Date(match.MatchDateNew) >= new Date(),
      );
    }
    return matches;
  }, [matches, filter]);

  const sortedMatches = useMemo(() => {
    const sorted = [...filteredMatches];
    if (filter === "all") {
      sorted.sort(
        (a, b) =>
          new Date(a.MatchDateNew).getTime() -
          new Date(b.MatchDateNew).getTime(),
      );
    } else if (filter === "completed") {
      sorted.sort(
        (a, b) =>
          new Date(b.MatchDateNew).getTime() -
          new Date(a.MatchDateNew).getTime(),
      );
    } else if (filter === "upcoming") {
      sorted.sort(
        (a, b) =>
          new Date(a.MatchDateNew).getTime() -
          new Date(b.MatchDateNew).getTime(),
      );
    }
    return sorted;
  }, [filteredMatches, filter]);

  const groupedMatches = useMemo(() => {
    return sortedMatches.reduce<Record<string, Match[]>>((acc, match) => {
      const date = match.MatchDateNew;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(match);
      return acc;
    }, {});
  }, [sortedMatches]);

  return (
    <div className="space-y-6">
      {Object.entries(groupedMatches).map(([date, matches]) => (
        <div key={date} className="space-y-4">
          <div className="flex w-full items-center gap-2">
            <span className="text-lg font-semibold whitespace-nowrap text-gray-700">
              {date}
            </span>
            <div className="h-px flex-1 bg-gray-300" style={{ minWidth: 0 }} />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {matches.map((match) => (
              <MatchCard key={match.MatchID} match={match} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
