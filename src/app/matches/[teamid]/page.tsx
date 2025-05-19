"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { MatchList } from "~/app/_components/schedule/MatchList";
import { api } from "~/trpc/react";

export default function OngoingSchedulePage() {
  const params = useParams();
  const teamid = useMemo(() => {
    if (!params || typeof params.teamid !== "string") return null;
    return params.teamid;
  }, [params]);

  const [matchesRaw] = api.matches.getAllMatches.useSuspenseQuery();
  const matches = {
    Matchsummary: matchesRaw.Matchsummary.filter(
      (match) => match.HomeTeamID === teamid || match.AwayTeamID === teamid,
    ),
  };

  return (
    <>
      <MatchList matches={matches} filter="all" />
    </>
  );
}
