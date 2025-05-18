"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
// import { useMemo } from "react";
import type { Match } from "~/models/matches";
import { api } from "~/trpc/react";

interface MatchCardProps {
  match: Match;
  clickable?: boolean;
}

export function MatchCard({ match, clickable = false }: MatchCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    if (clickable && match.MatchID) router.push(`/match/${match.MatchID}`);
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "Live":
        return "bg-accent-secondary-light-500 dark:bg-accent-secondary-dark-500 text-white";
      case "Post":
        return "text-primary-light-500 dark:text-primary-dark-500";
      default:
        return "text-accent-secondary-light-500 dark:text-accent-secondary-dark-500";
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

  const [pointTable] = api.points.getPoints.useSuspenseQuery();
  const homeTeamShortName = pointTable.find(
    (team) => team.TeamName === match.HomeTeamName,
  )?.TeamCode;
  const awayTeamShortName = pointTable.find(
    (team) => team.TeamName === match.AwayTeamName,
  )?.TeamCode;

  // const homeTeamShortName = useMemo(() => {
  //   if (!match.HomeTeamName) return "";
  //   return match.HomeTeamName.split(" ")
  //     .map((word) => word[0])
  //     .join("");
  // }, [match.HomeTeamName]);

  // const awayTeamShortName = useMemo(() => {
  //   if (!match.AwayTeamName) return "";
  //   return match.AwayTeamName.split(" ")
  //     .map((word) => word[0])
  //     .join("");
  // }, [match.AwayTeamName]);

  return (
    <div
      className={`dark:from-secondary-dark-200 dark:to-secondary-dark-100 border-secondary-light-400 flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-lg transition-all duration-200 outline-none dark:border-transparent dark:bg-gradient-to-br ${
        clickable
          ? "hover:bg-accent-primary-light-950/5 dark:hover:bg-accent-primary-dark-100/10 focus:bg-accent-primary-light-900/10 dark:focus:bg-accent-primary-dark-200/20 cursor-pointer hover:shadow-xl focus:shadow-xl"
          : "cursor-default"
      }`}
      tabIndex={clickable ? 0 : -1}
      onClick={handleCardClick}
    >
      <div className="mb-2 flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-secondary-light-200 dark:text-secondary-dark-800 text-xs font-semibold">
            #{match.MatchOrder ?? ""}
          </span>
          {match.MatchStatus === "Live" && (
            <span className="bg-accent-secondary-light-500 dark:bg-accent-secondary-dark-500 ring-accent-secondary-light-600 animate-pulse rounded-md px-3 py-1 text-xs font-bold text-white shadow-sm ring-1">
              LIVE
            </span>
          )}
          {match.MatchStatus !== "Live" && (
            <span
              className={`rounded-md px-2 py-1 text-xs font-semibold shadow-sm ${getStatusColor(
                match.MatchStatus,
              )} bg-secondary-light-800/10 dark:bg-secondary-dark-200 ring-secondary-light-400 ring-1 dark:ring-transparent`}
            >
              {match.MatchStatus === "Post"
                ? "Completed"
                : match.MatchStatus === "UpComing"
                  ? "Upcoming"
                  : (match.MatchStatus ?? "Unknown")}
            </span>
          )}
        </div>
        <span className="bg-secondary-light-900 dark:bg-secondary-dark-200 text-primary-light-600 dark:text-primary-dark-200 rounded px-2 py-1 text-xs font-medium">
          {match.MatchDateNew ?? match.MatchDate ?? "TBD"} •{" "}
          {match.MatchTime ? `${match.MatchTime} IST` : "TBD"}
        </span>
      </div>

      <div className="bg-secondary-light-800/10 dark:bg-secondary-dark-200 flex items-center justify-between rounded-xl px-4 py-3 shadow-inner">
        <div className="flex min-w-0 items-center gap-3">
          <div className="dark:bg-secondary-dark-50 relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
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
            <span className="text-primary-light-500 dark:text-primary-dark-100 hidden truncate text-base font-bold lg:block">
              {match.HomeTeamName ?? "TBD"}
            </span>
            <span className="text-primary-light-500 dark:text-primary-dark-100 hidden truncate text-base font-bold sm:block lg:hidden">
              {homeTeamShortName ?? "TBD"}
            </span>
            <span className="text-primary-light-500 dark:text-primary-dark-100 truncate text-base font-bold sm:hidden">
              {homeTeamShortName ?? "TBD"}
            </span>
          </div>
        </div>
        <div className="mx-2 flex flex-col items-center">
          <span className="text-secondary-light-100 dark:text-secondary-dark-600 text-xs font-semibold tracking-widest">
            VS
          </span>
        </div>
        <div className="flex min-w-0 flex-row-reverse items-center gap-3">
          <div className="dark:bg-secondary-dark-50 relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
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
            <span className="text-primary-light-500 dark:text-primary-dark-100 hidden truncate text-base font-bold lg:block">
              {match.AwayTeamName ?? "TBD"}
            </span>
            <span className="text-primary-light-500 dark:text-primary-dark-100 hidden truncate text-base font-bold sm:block lg:hidden">
              {awayTeamShortName ?? "TBD"}
            </span>
            <span className="text-primary-light-500 dark:text-primary-dark-100 truncate text-base font-bold sm:hidden">
              {awayTeamShortName ?? "TBD"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-1 text-center">
        <span className="bg-accent-secondary-light-500/10 dark:bg-accent-primary-dark-600 text-accent-secondary-light-500 dark:text-secondary-dark-50 ring-accent-secondary-light-500/20 inline-block rounded-lg px-3 py-2 text-sm font-semibold shadow-sm ring-1 dark:ring-transparent">
          {getMatchResult(match)}
        </span>
      </div>

      <div className="text-primary-light-600 dark:text-primary-dark-200 mt-1 text-center text-xs">
        <span className="bg-secondary-light-800/10 dark:bg-secondary-dark-200 ring-secondary-light-400/20 inline-block rounded px-2 py-1 font-medium ring-1 dark:ring-transparent">
          {match.GroundName ?? "TBD"}
          {match.city ? `, ${match.city}` : ""}
        </span>
      </div>
    </div>
  );
}
