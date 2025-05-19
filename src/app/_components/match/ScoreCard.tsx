import { useState } from "react";
import type {
  BattingCard as BattingCardType,
  BowlingCard as BowlingCardType,
  Extras,
} from "~/models/innings";
import { api } from "~/trpc/react";
import { BallByBall } from "./BallByBall";
import { PartnershipCard } from "./PartnershipCard";

const defaultLogo = "/favicon.ico";

function ExtrasCard({ extras }: { extras: Extras[] }) {
  const e = extras && extras.length > 0 ? extras[0] : undefined;
  if (!e) return null;
  return (
    <div className="bg-accent-primary-light-950 dark:bg-accent-primary-dark-50 mb-4 rounded-xl p-2 shadow-inner sm:p-4">
      <div className="text-accent-secondary-light-800 dark:text-accent-secondary-dark-500 mb-2 text-sm font-bold">
        Extras
      </div>
      <div className="text-primary-light-800 dark:text-primary-dark-800 flex flex-wrap gap-2 text-sm sm:gap-4">
        <span>
          Total: <span className="font-semibold">{e.TotalExtras}</span>
        </span>
        <span>Byes: {e.Byes}</span>
        <span>Leg Byes: {e.LegByes}</span>
        <span>No Balls: {e.NoBalls}</span>
        <span>Wides: {e.Wides}</span>
        {e.Penalty && <span>Penalty: {e.Penalty}</span>}
      </div>
      <div className="text-primary-light-600 dark:text-primary-dark-600 mt-2 text-xs">
        {e.BattingTeamName} {e.Total.replace(/\\\//g, "/")} ({e.FallWickets}{" "}
        wkts, {e.FallOvers} ov) | Run Rate: {e.CurrentRunRate}
      </div>
    </div>
  );
}

function BattingCard({ battingCard }: { battingCard: BattingCardType[] }) {
  return (
    <div className="mb-4 sm:mb-8">
      <h2 className="text-accent-secondary-light-800 dark:text-accent-secondary-dark-500 mb-2 text-lg font-bold">
        Batting
      </h2>
      <div className="from-secondary-light-800 to-secondary-light-900 dark:from-secondary-dark-100 dark:to-secondary-dark-200 overflow-x-auto rounded-2xl bg-gradient-to-br shadow-md">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-accent-primary-light-100 dark:bg-accent-primary-dark-100 text-secondary-light-950 dark:text-accent-secondary-dark-800">
              <th className="px-1 py-2 text-xs font-bold sm:px-3">#</th>
              <th className="px-2 py-2 text-left text-xs font-bold sm:px-3">
                Player
              </th>
              <th className="px-1 py-2 text-xs font-bold sm:px-3">R</th>
              <th className="px-1 py-2 text-xs font-bold sm:px-3">B</th>
              <th className="px-1 py-2 text-xs font-bold sm:px-3">4s</th>
              <th className="px-1 py-2 text-xs font-bold sm:px-3">6s</th>
              <th className="px-1 py-2 text-xs font-bold sm:px-3">SR</th>
              <th className="px-1 py-2 text-xs font-bold sm:px-3">Out</th>
            </tr>
          </thead>
          <tbody>
            {battingCard.map((player, idx) => (
              <tr
                key={player.PlayerID}
                className="hover:bg-accent-primary-light-200/40 dark:hover:bg-accent-primary-dark-200/40 text-center transition-colors"
              >
                <td className="text-primary-light-800 dark:text-primary-dark-800 px-1 py-1 font-medium sm:px-3">
                  {idx + 1}
                </td>
                <td className="flex items-center gap-1 px-2 py-1 text-left sm:gap-2 sm:px-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={player.PlayerImage || "/favicon.ico"}
                    alt={player.PlayerName}
                    className="bg-secondary-light-100 dark:bg-secondary-dark-100 h-4 w-4 rounded-full shadow sm:h-5 sm:w-5"
                  />
                  <span className="text-primary-light-800 dark:text-primary-dark-800 truncate font-semibold">
                    {player.PlayerName}
                  </span>
                </td>
                <td className="text-accent-secondary-light-800 dark:text-accent-secondary-dark-800 px-1 py-1 font-bold sm:px-3">
                  {player.Runs}
                </td>
                <td className="text-primary-light-600 dark:text-primary-dark-600 px-1 py-1 sm:px-3">
                  {player.Balls}
                </td>
                <td className="text-primary-light-600 dark:text-primary-dark-600 px-1 py-1 sm:px-3">
                  {player.Fours}
                </td>
                <td className="text-primary-light-600 dark:text-primary-dark-600 px-1 py-1 sm:px-3">
                  {player.Sixes}
                </td>
                <td className="text-primary-light-600 dark:text-primary-dark-600 px-1 py-1 sm:px-3">
                  {player.StrikeRate}
                </td>
                <td className="text-secondary-light-100 dark:text-secondary-dark-800 px-1 py-1 text-xs sm:px-3">
                  {player.ShortOutDesc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BowlingCard({ bowlingCard }: { bowlingCard: BowlingCardType[] }) {
  return (
    <div className="mb-4 sm:mb-8">
      <h2 className="text-accent-secondary-light-800 dark:text-accent-secondary-dark-500 mb-2 text-lg font-bold">
        Bowling
      </h2>
      <div className="from-secondary-light-800 to-secondary-light-900 dark:from-secondary-dark-100 dark:to-secondary-dark-200 overflow-x-auto rounded-2xl bg-gradient-to-br shadow-md">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-accent-primary-light-100 dark:bg-accent-primary-dark-100 text-secondary-light-950 dark:text-accent-secondary-dark-800">
              <th className="px-1 py-2 text-xs font-bold sm:px-3">#</th>
              <th className="px-2 py-2 text-left text-xs font-bold sm:px-3">
                Player
              </th>
              <th className="px-1 py-2 text-xs font-bold sm:px-3">O</th>
              <th className="px-1 py-2 text-xs font-bold sm:px-3">M</th>
              <th className="px-1 py-2 text-xs font-bold sm:px-3">R</th>
              <th className="px-1 py-2 text-xs font-bold sm:px-3">W</th>
              <th className="px-1 py-2 text-xs font-bold sm:px-3">Econ</th>
              <th className="px-1 py-2 text-xs font-bold sm:px-3">4s</th>
              <th className="px-1 py-2 text-xs font-bold sm:px-3">6s</th>
            </tr>
          </thead>
          <tbody>
            {bowlingCard.map((player, idx) => (
              <tr
                key={player.PlayerID}
                className="hover:bg-accent-primary-light-200/40 dark:hover:bg-accent-primary-dark-200/40 text-center transition-colors"
              >
                <td className="text-primary-light-800 dark:text-primary-dark-800 px-1 py-1 font-medium sm:px-3">
                  {idx + 1}
                </td>
                <td className="flex items-center gap-1 px-2 py-1 text-left sm:gap-2 sm:px-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={player.PlayerImage || defaultLogo}
                    alt={player.PlayerName}
                    className="bg-secondary-light-100 dark:bg-secondary-dark-100 h-4 w-4 rounded-full shadow sm:h-5 sm:w-5"
                  />
                  <span className="text-primary-light-800 dark:text-primary-dark-800 truncate font-semibold">
                    {player.PlayerName}
                  </span>
                </td>
                <td className="text-primary-light-600 dark:text-primary-dark-600 px-1 py-1 sm:px-3">
                  {player.Overs}
                </td>
                <td className="text-primary-light-600 dark:text-primary-dark-600 px-1 py-1 sm:px-3">
                  {player.Maidens}
                </td>
                <td className="text-primary-light-600 dark:text-primary-dark-600 px-1 py-1 sm:px-3">
                  {player.Runs}
                </td>
                <td className="text-accent-secondary-light-800 dark:text-accent-secondary-dark-800 px-1 py-1 font-bold sm:px-3">
                  {player.Wickets}
                </td>
                <td className="text-primary-light-600 dark:text-primary-dark-600 px-1 py-1 sm:px-3">
                  {player.Economy}
                </td>
                <td className="text-primary-light-600 dark:text-primary-dark-600 px-1 py-1 sm:px-3">
                  {player.Fours}
                </td>
                <td className="text-primary-light-600 dark:text-primary-dark-600 px-1 py-1 sm:px-3">
                  {player.Sixes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface ScoreCardProps {
  matchId: string;
}

export default function ScoreCard({ matchId }: ScoreCardProps) {
  const [selectedInnings, setSelectedInnings] = useState("1");
  const innings1 = api.innings.getInnings.useQuery({ matchId, innings: "1" });
  const innings2 = api.innings.getInnings.useQuery({ matchId, innings: "2" });

  const innings1Batting = innings1.data?.Innings1?.BattingCard;

  const innings1Bowling = innings1.data?.Innings1?.BowlingCard;

  const innings1Extras = innings1.data?.Innings1?.Extras;

  const innings1Partnerships = innings1.data?.Innings1?.PartnershipScores;

  const innings2Batting = innings2.data?.Innings2?.BattingCard;

  const innings2Bowling = innings2.data?.Innings2?.BowlingCard;

  const innings2Extras = innings2.data?.Innings2?.Extras;

  const innings2Partnerships = innings2.data?.Innings2?.PartnershipScores;

  if (innings1.isLoading || innings2.isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (innings1.error || innings2.error) {
    return (
      <div className="p-4">
        <p className="text-red-500">Error loading innings data.</p>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4">
      <div className="mb-4 flex gap-2 sm:gap-4">
        <button
          className={`focus:ring-accent-secondary-light-800 dark:focus:ring-accent-secondary-dark-800 rounded-2xl px-3 py-1.5 text-sm font-semibold shadow transition-all duration-150 focus:ring-2 focus:outline-none sm:px-4 sm:py-2 sm:text-base ${
            selectedInnings === "1"
              ? "bg-accent-secondary-light-600 dark:bg-accent-secondary-dark-800 text-secondary-light-800 dark:text-secondary-dark-100"
              : "dark:bg-secondary-dark-200 text-accent-secondary-light-800 dark:text-accent-secondary-dark-800 hover:bg-accent-primary-light-100 hover:text-secondary-light-950 dark:hover:bg-accent-primary-dark-100"
          }`}
          onClick={() => setSelectedInnings("1")}
        >
          Innings 1
        </button>
        <button
          className={`focus:ring-accent-secondary-light-800 dark:focus:ring-accent-secondary-dark-800 rounded-2xl px-3 py-1.5 text-sm font-semibold shadow transition-all duration-150 focus:ring-2 focus:outline-none sm:px-4 sm:py-2 sm:text-base ${
            selectedInnings === "2"
              ? "bg-accent-secondary-light-600 dark:bg-accent-secondary-dark-800 text-secondary-light-800 dark:text-secondary-dark-100"
              : "dark:bg-secondary-dark-200 text-accent-secondary-light-800 dark:text-accent-secondary-dark-800 hover:bg-accent-primary-light-100 hover:text-secondary-light-950 dark:hover:bg-accent-primary-dark-100"
          }`}
          onClick={() => setSelectedInnings("2")}
        >
          Innings 2
        </button>
      </div>
      {selectedInnings === "1" && innings1.data?.Innings1 && (
        <>
          {innings1Batting && <BattingCard battingCard={innings1Batting} />}
          {innings1Bowling && <BowlingCard bowlingCard={innings1Bowling} />}
          {innings1Extras && <ExtrasCard extras={innings1Extras} />}
          {innings1Partnerships && (
            <PartnershipCard partnerships={innings1Partnerships} />
          )}
          {innings1.data?.Innings1?.BallByBall && (
            <BallByBall ballByBall={innings1.data.Innings1.BallByBall} />
          )}
        </>
      )}
      {selectedInnings === "2" && innings2.data?.Innings2 && (
        <>
          {innings2Batting && <BattingCard battingCard={innings2Batting} />}
          {innings2Bowling && <BowlingCard bowlingCard={innings2Bowling} />}
          {innings2Extras && <ExtrasCard extras={innings2Extras} />}
          {innings2Partnerships && (
            <PartnershipCard partnerships={innings2Partnerships} />
          )}
          {innings2.data?.Innings2?.BallByBall && (
            <BallByBall ballByBall={innings2.data.Innings2.BallByBall} />
          )}
        </>
      )}
    </div>
  );
}

export { default as ScoreCard } from "./ScoreCard";
