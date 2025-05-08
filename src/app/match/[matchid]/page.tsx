"use client";

import { useMemo, useState } from "react";
import ScoreCard from "../../_components/match/ScoreCard";
import { MatchCard } from "~/app/_components/schedule/MatchCard";
import type { Match } from "~/models/matches";
import { api } from "~/trpc/react";
import { useParams } from "next/navigation";

export default function MatchPage() {
    const [tab, setTab] = useState<"live" | "scorecard" | "commentary">("live");
  const { matchid } = useParams();

  const match = api.matches.getMatchById?.useQuery
    ? api.matches.getMatchById.useQuery({ matchId: matchid as string })
    : { data: null, isLoading: false };

  const m = useMemo(() => {
    if (!match.data) return null;
    return Array.isArray(match.data) ? match.data[0] : match.data;
  }, [match.data]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Live Match</h1>

      {/* Live Match Card (top card) */}
      {m && <MatchCard match={m}/>}

      {/* Match Details Tabs */}
      <div className="mt-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-md">
        <div className="flex space-x-4 border-b border-gray-100">
          <button
            className={`pb-2 font-bold transition-colors rounded-t-md shadow-sm ${tab === "live" ? "border-b-2 border-indigo-600 text-indigo-600 bg-white" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setTab("live")}
          >
            Live
          </button>
          <button
            className={`pb-2 font-bold transition-colors rounded-t-md shadow-sm ${tab === "scorecard" ? "border-b-2 border-indigo-600 text-indigo-600 bg-white" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setTab("scorecard")}
          >
            Scorecard
          </button>
          <button
            className={`pb-2 font-bold transition-colors rounded-t-md shadow-sm ${tab === "commentary" ? "border-b-2 border-indigo-600 text-indigo-600 bg-white" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setTab("commentary")}
          >
            Commentary
          </button>
        </div>
        <div className="mt-4">
          {tab === "live" && <p className="text-gray-600">Live commentary and updates will appear here...</p>}
          {tab === "scorecard" && <ScoreCard matchId={matchid as string} />}
          {tab === "commentary" && <p className="text-gray-600">Ball by ball commentary will appear here...</p>}
        </div>
      </div>
    </div>
  );
}
