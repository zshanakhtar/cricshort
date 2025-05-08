import { useState } from "react";
import { api } from "~/trpc/react";
import { useParams } from "next/navigation";
import type { Match } from "~/models/matches";
import { MatchCard } from "../schedule/MatchCard";

const defaultLogo = "/favicon.ico";

export default function MatchDetails({matchId}: {matchId: string}) {
  
  const [selectedInnings, setSelectedInnings] = useState("1");

  // Fetch match and innings data
  const innings1 = api.innings.getInnings.useQuery({
    matchId,
    innings: "1",
  });
  const innings2 = api.innings.getInnings.useQuery({
    matchId,
    innings: "2",
  });
  

  // Modernized Batting Card
  const renderBattingCard = (battingCard: any[], inningsLabel: string) => (
    <div className="mb-8">
      <h2 className="mb-2 text-lg font-bold text-blue-700">
        Innings {inningsLabel} Batting
      </h2>
      <div className="overflow-x-auto rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-md">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-blue-50">
              <th className="px-3 py-2 text-xs font-bold text-blue-700">#</th>
              <th className="px-3 py-2 text-left text-xs font-bold text-blue-700">
                Player
              </th>
              <th className="px-3 py-2 text-xs font-bold text-blue-700">R</th>
              <th className="px-3 py-2 text-xs font-bold text-blue-700">B</th>
              <th className="px-3 py-2 text-xs font-bold text-blue-700">4s</th>
              <th className="px-3 py-2 text-xs font-bold text-blue-700">6s</th>
              <th className="px-3 py-2 text-xs font-bold text-blue-700">SR</th>
              <th className="px-3 py-2 text-xs font-bold text-blue-700">Out</th>
            </tr>
          </thead>
          <tbody>
            {battingCard.map((player, idx) => (
              <tr
                key={player.PlayerID}
                className="text-center transition-colors hover:bg-blue-100/40"
              >
                <td className="px-3 py-1 font-medium text-gray-700">
                  {idx + 1}
                </td>
                <td className="flex items-center gap-2 px-3 py-1 text-left">
                  <img
                    src={player.PlayerImage || defaultLogo}
                    alt={player.PlayerName}
                    className="h-5 w-5 rounded-full bg-white shadow"
                  />
                  <span className="font-semibold text-gray-800">
                    {player.PlayerName}
                  </span>
                </td>
                <td className="px-3 py-1 font-bold text-blue-700">
                  {player.Runs}
                </td>
                <td className="px-3 py-1">{player.Balls}</td>
                <td className="px-3 py-1">{player.Fours}</td>
                <td className="px-3 py-1">{player.Sixes}</td>
                <td className="px-3 py-1">{player.StrikeRate}</td>
                <td className="px-3 py-1 text-xs text-gray-500">
                  {player.ShortOutDesc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Modernized Bowling Card
  const renderBowlingCard = (bowlingCard: any[], inningsLabel: string) => (
    <div className="mb-8">
      <h2 className="mb-2 text-lg font-bold text-blue-700">
        Innings {inningsLabel} Bowling
      </h2>
      <div className="overflow-x-auto rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-md">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-blue-50">
              <th className="px-3 py-2 text-xs font-bold text-blue-700">#</th>
              <th className="px-3 py-2 text-left text-xs font-bold text-blue-700">
                Player
              </th>
              <th className="px-3 py-2 text-xs font-bold text-blue-700">O</th>
              <th className="px-3 py-2 text-xs font-bold text-blue-700">M</th>
              <th className="px-3 py-2 text-xs font-bold text-blue-700">R</th>
              <th className="px-3 py-2 text-xs font-bold text-blue-700">W</th>
              <th className="px-3 py-2 text-xs font-bold text-blue-700">
                Econ
              </th>
              <th className="px-3 py-2 text-xs font-bold text-blue-700">4s</th>
              <th className="px-3 py-2 text-xs font-bold text-blue-700">6s</th>
            </tr>
          </thead>
          <tbody>
            {bowlingCard.map((player, idx) => (
              <tr
                key={player.PlayerID}
                className="text-center transition-colors hover:bg-blue-100/40"
              >
                <td className="px-3 py-1 font-medium text-gray-700">
                  {idx + 1}
                </td>
                <td className="flex items-center gap-2 px-3 py-1 text-left">
                  <img
                    src={player.PlayerImage || defaultLogo}
                    alt={player.PlayerName}
                    className="h-5 w-5 rounded-full bg-white shadow"
                  />
                  <span className="font-semibold text-gray-800">
                    {player.PlayerName}
                  </span>
                </td>
                <td className="px-3 py-1">{player.Overs}</td>
                <td className="px-3 py-1">{player.Maidens}</td>
                <td className="px-3 py-1">{player.Runs}</td>
                <td className="px-3 py-1 font-bold text-blue-700">
                  {player.Wickets}
                </td>
                <td className="px-3 py-1">{player.Economy}</td>
                <td className="px-3 py-1">{player.Fours}</td>
                <td className="px-3 py-1">{player.Sixes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl p-4">
      <div className="mb-4 flex gap-4">
        <button
          className={`rounded-2xl px-4 py-2 font-semibold shadow transition-all duration-150 focus:ring-2 focus:ring-blue-400 focus:outline-none ${selectedInnings === "1" ? "bg-blue-600 text-white" : "bg-gray-100 text-blue-700 hover:bg-blue-50"}`}
          onClick={() => setSelectedInnings("1")}
        >
          Innings 1
        </button>
        <button
          className={`rounded-2xl px-4 py-2 font-semibold shadow transition-all duration-150 focus:ring-2 focus:ring-blue-400 focus:outline-none ${selectedInnings === "2" ? "bg-blue-600 text-white" : "bg-gray-100 text-blue-700 hover:bg-blue-50"}`}
          onClick={() => setSelectedInnings("2")}
        >
          Innings 2
        </button>
      </div>
      {selectedInnings === "1" && innings1.data && (
        <>
          {renderBattingCard(innings1.data.Innings1?.BattingCard || [], "1")}
          {innings1.data.Innings1?.BowlingCard &&
            renderBowlingCard(innings1.data.Innings1.BowlingCard, "1")}
        </>
      )}
      {selectedInnings === "2" && innings2.data && (
        <>
          {renderBattingCard(innings2.data.Innings2?.BattingCard || [], "2")}
          {innings2.data.Innings2?.BowlingCard &&
            renderBowlingCard(innings2.data.Innings2.BowlingCard, "2")}
        </>
      )}
      {(innings1.isLoading || innings2.isLoading) && <p>Loading...</p>}
      {(innings1.error || innings2.error) && (
        <p className="text-red-500">Error loading innings data.</p>
      )}
    </div>
  );
}

export { default as ScoreCard } from "./ScoreCard";
