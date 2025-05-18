"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import type { Match } from "~/models/matches";

interface MatchCardProps {
  match: Match;
  clickable?: boolean;
}

export const MatchCard = ({ match, clickable = false }: MatchCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (clickable && match.MatchID) router.push(`/match/${match.MatchID}`);
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "Live":
        return "bg-red-500 text-white";
      case "Post":
        return "text-gray-500";
      default:
        return "text-blue-500";
    }
  };

  const getMatchResult = (match: Match) => {
    if (match.MatchStatus === "Live") {
      return match.Comments ?? match.FirstBattingSummary ?? "Live";
    }
    if (match.MatchStatus === "Post") {
      return match.Comments ?? "Completed";
    }
    return match.MatchTime ? `${match.MatchTime} IST` : "Upcoming";
  };

  const homeTeamShortName = useMemo(() => {
    if (!match.HomeTeamName) return "";
    return match.HomeTeamName.split(" ")
      .map((word) => word[0])
      .join("");
  }, [match.HomeTeamName]);

  const awayTeamShortName = useMemo(() => {
    if (!match.AwayTeamName) return "";
    return match.AwayTeamName.split(" ")
      .map((word) => word[0])
      .join("");
  }, [match.AwayTeamName]);

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-md transition-all duration-200 outline-none ${clickable ? "cursor-pointer hover:bg-blue-50/40 hover:shadow-2xl focus:bg-blue-100/40 focus:shadow-2xl" : "cursor-default"}`}
      tabIndex={clickable ? 0 : -1}
      onClick={handleCardClick}
    >
      <div className="mb-2 flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400">
            #{match.MatchOrder ?? ""}
          </span>
          {match.MatchStatus === "Live" && (
            <span className="animate-pulse rounded-md bg-red-500/90 px-3 py-1 text-xs font-bold text-white shadow-sm">
              LIVE
            </span>
          )}
          {match.MatchStatus !== "Live" && (
            <span
              className={`rounded-md px-2 py-1 text-xs font-semibold shadow-sm ${getStatusColor(match.MatchStatus)} bg-gray-100/80`}
            >
              {match.MatchStatus === "Post"
                ? "Completed"
                : match.MatchStatus === "UpComing"
                  ? "Upcoming"
                  : (match.MatchStatus ?? "Unknown")}
            </span>
          )}
        </div>
        <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">
          {match.MatchDateNew ?? match.MatchDate ?? "TBD"} •{" "}
          {match.MatchTime ? `${match.MatchTime} IST` : "TBD"}
        </span>
      </div>

      {/* Teams Row */}
      <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 shadow-inner">
        {/* Home Team */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
            {match.HomeTeamLogo && match.HomeTeamName && (
              <Image
                src={match.HomeTeamLogo}
                alt={match.HomeTeamName}
                fill
                className="object-contain p-1"
              />
            )}
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="hidden truncate text-base font-bold text-gray-800 lg:block">
              {match.HomeTeamName ?? "TBD"}
            </span>
            <span className="hidden truncate text-base font-bold text-gray-800 sm:block lg:hidden">
              {homeTeamShortName || "TBD"}
            </span>
            <span className="truncate text-base font-bold text-gray-800 sm:hidden">
              {homeTeamShortName || "TBD"}
            </span>
          </div>
        </div>
        <div className="mx-2 flex flex-col items-center">
          <span className="text-xs font-semibold tracking-widest text-gray-400">
            VS
          </span>
        </div>
        <div className="flex min-w-0 flex-row-reverse items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
            {match.AwayTeamLogo && match.AwayTeamName && (
              <Image
                src={match.AwayTeamLogo}
                alt={match.AwayTeamName}
                fill
                className="object-contain p-1"
              />
            )}
          </div>
          <div className="flex min-w-0 flex-col text-right">
            <span className="hidden truncate text-base font-bold text-gray-800 lg:block">
              {match.AwayTeamName ?? "TBD"}
            </span>
            <span className="hidden truncate text-base font-bold text-gray-800 sm:block lg:hidden">
              {awayTeamShortName || "TBD"}
            </span>
            <span className="truncate text-base font-bold text-gray-800 sm:hidden">
              {awayTeamShortName || "TBD"}
            </span>
          </div>
        </div>
      </div>

      {/* Match Result / Comments */}
      <div className="mt-1 text-center">
        <span className="inline-block rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 shadow-sm">
          {getMatchResult(match)}
        </span>
      </div>

      {/* Ground & City */}
      <div className="mt-1 text-center text-xs text-gray-500">
        <span className="inline-block rounded bg-gray-100 px-2 py-1 font-medium">
          {match.GroundName ?? "TBD"}
          {match.city ? `, ${match.city}` : ""}
        </span>
      </div>
    </div>
  );
};
