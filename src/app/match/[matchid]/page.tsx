"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { MatchCard } from "~/app/_components/schedule/MatchCard";
import type { Match } from "~/models/matches";
import { api } from "~/trpc/react";
import ScoreCard from "../../_components/match/ScoreCard";

function isValidMatch(data: unknown): data is Match {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.MatchID === "number" &&
    (d.MatchStatus === null || typeof d.MatchStatus === "string") &&
    (d.MatchName === null || typeof d.MatchName === "string")
  );
}

export default function MatchPage() {
  const params = useParams();
  const matchid = useMemo(() => {
    if (!params || typeof params.matchid !== "string") return null;
    return params.matchid;
  }, [params]);

  const matchQuery = api.matches.getMatchById.useQuery(
    { matchId: matchid ?? "" },
    {
      enabled: matchid !== null,
      retry: false,
    },
  );

  const match = useMemo<Match | null>(() => {
    const data = matchQuery.data;
    if (!data) return null;

    try {
      if (isValidMatch(data)) {
        return data;
      }
      return null;
    } catch (error) {
      console.error("Error converting match data:", error);
      return null;
    }
  }, [matchQuery.data]);

  if (matchQuery.isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Match Details</h1>
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!matchid) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Match Details</h1>
        <div className="text-red-500">Invalid match ID</div>
      </div>
    );
  }

  if (matchQuery.error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Match Details</h1>
        <div className="text-red-500">
          {matchQuery.error instanceof Error
            ? matchQuery.error.message
            : "Error loading match details"}
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Match Details</h1>
        <div className="text-red-500">Match data not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Match Details</h1>
      <MatchCard match={match} />
      <div className="mt-4">
        <ScoreCard matchId={matchid} />
      </div>
    </div>
  );
}
