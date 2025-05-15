import { useState } from "react";
import { api } from "~/trpc/react";
import { PartnershipCard } from "./PartnershipCard";
import type {
  BattingCard as BattingCardType,
  BowlingCard as BowlingCardType,
  Extras,
  PartnershipScore,
} from "~/models/innings";

const defaultLogo = "/favicon.ico";

// Helper to safely convert values to string based on schema types
function toSafeString(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();
  if (typeof value === "boolean") return value.toString();
  // Avoid [object Object] stringification
  return "";
}

function mapNullableArray<T extends Record<string, unknown>>(
  arr: Array<Record<string, unknown>> | undefined,
  requiredKeys: (keyof T)[],
): T[] {
  if (!arr) return [];
  return arr
    .filter((item) => requiredKeys.every((k) => k in item))
    .map((item) => {
      const clean = {} as T;
      requiredKeys.forEach((key) => {
        clean[key] = normalizeValue(
          key as string,
          item[key as string],
        ) as T[keyof T];
      });
      return clean;
    });
}

function normalizeValue(key: string, value: unknown): string | number | null {
  // Handle null/undefined based on schema types
  if (value === null || value === undefined) {
    // Required number fields from battingCardSchema
    if (
      [
        "MatchID",
        "InningsNo",
        "TeamID",
        "MatchPlayingOrder",
        "Runs",
        "Balls",
        "DotBalls",
        "Ones",
        "Twos",
        "Threes",
        "Fours",
        "Sixes",
        "MinOver",
        "MinStrikerOver",
        "AgainstFast",
        "AgainstSpin",
      ].includes(key)
    ) {
      return 0;
    }

    // Required number fields from bowlingCardSchema
    if (
      [
        "Maidens",
        "Wickets",
        "Wides",
        "NoBalls",
        "BowlingOrder",
        "TotalLegalBallsBowled",
        "ScoringBalls",
      ].includes(key)
    ) {
      return 0;
    }

    // Nullable fields per schema
    if (["PlayingOrder", "WicketNo"].includes(key)) {
      return null;
    }

    // Required string fields per schema
    if (
      [
        "PlayerID",
        "PlayerName",
        "PlayerImage",
        "BowlerName",
        "OutDesc",
        "ShortOutDesc",
        "PlayerShortName",
        "PlayerImageName",
        "PLAYER_ID",
      ].includes(key)
    ) {
      return "";
    }

    // String fields that should be "0" when null
    if (
      [
        "DotBallPercentage",
        "DotBallFrequency",
        "BoundaryPercentage",
        "BoundaryFrequency",
        "StrikeRate",
        "AgainstFastPercent",
        "AgainstSpinPercent",
        "Overs",
        "Economy",
        "DBPercent",
        "DBFrequency",
        "BdryPercent",
        "BdryFreq",
        "FourPercent",
        "SixPercent",
      ].includes(key)
    ) {
      return "0";
    }

    return "";
  }

  // Convert non-null values according to schema types

  // Required number fields from batting/bowling schemas
  if (
    [
      "MatchID",
      "InningsNo",
      "TeamID",
      "MatchPlayingOrder",
      "Runs",
      "Balls",
      "DotBalls",
      "Ones",
      "Twos",
      "Threes",
      "Fours",
      "Sixes",
      "MinOver",
      "MinStrikerOver",
      "AgainstFast",
      "AgainstSpin",
      "Maidens",
      "Wickets",
      "Wides",
      "NoBalls",
      "BowlingOrder",
      "TotalLegalBallsBowled",
      "ScoringBalls",
    ].includes(key)
  ) {
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      const num = Number(value);
      return isNaN(num) ? 0 : num;
    }
    return 0;
  }

  // Handle string fields
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();
  if (typeof value === "boolean") return value.toString();

  // For objects/arrays/null/undefined, return empty string to avoid [object Object]
  return "";
}

function ExtrasCard({ extras }: { extras: Extras[] }) {
  const e = extras && extras.length > 0 ? extras[0] : undefined;
  if (!e) return null;
  return (
    <div className="mb-4 rounded-xl bg-yellow-50 p-4 shadow-inner">
      <div className="mb-2 text-sm font-bold text-yellow-700">Extras</div>
      <div className="flex flex-wrap gap-4 text-sm">
        <span>
          Total: <span className="font-semibold">{e.TotalExtras}</span>
        </span>
        <span>Byes: {e.Byes}</span>
        <span>Leg Byes: {e.LegByes}</span>
        <span>No Balls: {e.NoBalls}</span>
        <span>Wides: {e.Wides}</span>
        {e.Penalty && <span>Penalty: {e.Penalty}</span>}
      </div>
      <div className="mt-2 text-xs text-gray-500">
        {toSafeString(e.BattingTeamName)}{" "}
        {toSafeString(e.Total).replace(/\\\//g, "/")} (
        {toSafeString(e.FallWickets)} wkts, {toSafeString(e.FallOvers)} ov) |
        Run Rate: {toSafeString(e.CurrentRunRate)}
      </div>
    </div>
  );
}

function BattingCard({ battingCard }: { battingCard: BattingCardType[] }) {
  return (
    <div className="mb-8">
      <h2 className="mb-2 text-lg font-bold text-blue-700">Batting</h2>
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={player.PlayerImage || "/favicon.ico"}
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
}

function BowlingCard({ bowlingCard }: { bowlingCard: BowlingCardType[] }) {
  return (
    <div className="mb-8">
      <h2 className="mb-2 text-lg font-bold text-blue-700">Bowling</h2>
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
}

interface ScoreCardProps {
  matchId: string;
}

export default function ScoreCard({ matchId }: ScoreCardProps) {
  const [selectedInnings, setSelectedInnings] = useState("1");
  const innings1 = api.innings.getInnings.useQuery({ matchId, innings: "1" });
  const innings2 = api.innings.getInnings.useQuery({ matchId, innings: "2" });

  // Map/clean data to match types
  const innings1Batting = mapNullableArray<BattingCardType>(
    innings1.data?.Innings1?.BattingCard,
    [
      "MatchID",
      "InningsNo",
      "TeamID",
      "PlayerID",
      "PlayerName",
      "PlayerImage",
      "MatchPlayingOrder",
      "BowlerName",
      "OutDesc",
      "ShortOutDesc",
      "Runs",
      "Balls",
      "DotBalls",
      "DotBallPercentage",
      "DotBallFrequency",
      "Ones",
      "Twos",
      "Threes",
      "Fours",
      "Sixes",
      "BoundaryPercentage",
      "BoundaryFrequency",
      "StrikeRate",
      "MinOver",
      "MinStrikerOver",
      "AgainstFast",
      "AgainstSpin",
      "AgainstFastPercent",
      "AgainstSpinPercent",
      "PLAYER_ID",
    ],
  );
  const innings1Bowling = mapNullableArray<BowlingCardType>(
    innings1.data?.Innings1?.BowlingCard,
    [
      "MatchID",
      "InningsNo",
      "TeamID",
      "PlayerID",
      "PlayerName",
      "PlayerShortName",
      "PlayerImageName",
      "PlayerImage",
      "Overs",
      "Maidens",
      "Runs",
      "Wickets",
      "Wides",
      "NoBalls",
      "Economy",
      "BowlingOrder",
      "TotalLegalBallsBowled",
      "ScoringBalls",
      "DotBalls",
      "DBPercent",
      "DBFrequency",
      "Ones",
      "Twos",
      "Threes",
      "Fours",
      "Sixes",
      "BdryPercent",
      "BdryFreq",
      "StrikeRate",
      "FourPercent",
      "SixPercent",
    ],
  );
  const innings1Extras = mapNullableArray<Extras>(
    innings1.data?.Innings1?.Extras,
    [
      "MatchID",
      "InningsNo",
      "TeamID",
      "Total",
      "TotalExtras",
      "Byes",
      "LegByes",
      "NoBalls",
      "Wides",
      "Penalty",
      "CurrentRunRate",
      "FallScore",
      "FallWickets",
      "FallOvers",
      "BattingTeamName",
      "BowlingTeamName",
      "MaxPartnerShipRuns",
    ],
  );
  const innings1Partnerships = mapNullableArray<PartnershipScore>(
    innings1.data?.Innings1?.PartnershipScores,
    [
      "MatchID",
      "BattingTeamID",
      "InningsNo",
      "StrikerID",
      "Striker",
      "NonStrikerID",
      "NonStriker",
      "PartnershipTotal",
      "StrikerRuns",
      "StrikerBalls",
      "Extras",
      "NonStrikerRuns",
      "NonStrikerBalls",
      "MatchMaxOver",
      "MatchMinOver",
      "RowNumber",
    ],
  );

  const innings2Batting = mapNullableArray<BattingCardType>(
    innings2.data?.Innings2?.BattingCard,
    [
      "MatchID",
      "InningsNo",
      "TeamID",
      "PlayerID",
      "PlayerName",
      "PlayerImage",
      "MatchPlayingOrder",
      "BowlerName",
      "OutDesc",
      "ShortOutDesc",
      "Runs",
      "Balls",
      "DotBalls",
      "DotBallPercentage",
      "DotBallFrequency",
      "Ones",
      "Twos",
      "Threes",
      "Fours",
      "Sixes",
      "BoundaryPercentage",
      "BoundaryFrequency",
      "StrikeRate",
      "MinOver",
      "MinStrikerOver",
      "AgainstFast",
      "AgainstSpin",
      "AgainstFastPercent",
      "AgainstSpinPercent",
      "PLAYER_ID",
    ],
  );
  const innings2Bowling = mapNullableArray<BowlingCardType>(
    innings2.data?.Innings2?.BowlingCard,
    [
      "MatchID",
      "InningsNo",
      "TeamID",
      "PlayerID",
      "PlayerName",
      "PlayerShortName",
      "PlayerImageName",
      "PlayerImage",
      "Overs",
      "Maidens",
      "Runs",
      "Wickets",
      "Wides",
      "NoBalls",
      "Economy",
      "BowlingOrder",
      "TotalLegalBallsBowled",
      "ScoringBalls",
      "DotBalls",
      "DBPercent",
      "DBFrequency",
      "Ones",
      "Twos",
      "Threes",
      "Fours",
      "Sixes",
      "BdryPercent",
      "BdryFreq",
      "StrikeRate",
      "FourPercent",
      "SixPercent",
    ],
  );
  const innings2Extras = mapNullableArray<Extras>(
    innings2.data?.Innings2?.Extras,
    [
      "MatchID",
      "InningsNo",
      "TeamID",
      "Total",
      "TotalExtras",
      "Byes",
      "LegByes",
      "NoBalls",
      "Wides",
      "Penalty",
      "CurrentRunRate",
      "FallScore",
      "FallWickets",
      "FallOvers",
      "BattingTeamName",
      "BowlingTeamName",
      "MaxPartnerShipRuns",
    ],
  );
  const innings2Partnerships = mapNullableArray<PartnershipScore>(
    innings2.data?.Innings2?.PartnershipScores,
    [
      "MatchID",
      "BattingTeamID",
      "InningsNo",
      "StrikerID",
      "Striker",
      "NonStrikerID",
      "NonStriker",
      "PartnershipTotal",
      "StrikerRuns",
      "StrikerBalls",
      "Extras",
      "NonStrikerRuns",
      "NonStrikerBalls",
      "MatchMaxOver",
      "MatchMinOver",
      "RowNumber",
    ],
  );

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
    <div className="p-4">
      <div className="mb-4 flex gap-4">
        <button
          className={`rounded-2xl px-4 py-2 font-semibold shadow transition-all duration-150 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
            selectedInnings === "1"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-blue-700 hover:bg-blue-50"
          }`}
          onClick={() => setSelectedInnings("1")}
        >
          Innings 1
        </button>
        <button
          className={`rounded-2xl px-4 py-2 font-semibold shadow transition-all duration-150 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
            selectedInnings === "2"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-blue-700 hover:bg-blue-50"
          }`}
          onClick={() => setSelectedInnings("2")}
        >
          Innings 2
        </button>
      </div>
      {selectedInnings === "1" && innings1.data?.Innings1 && (
        <>
          <BattingCard battingCard={innings1Batting} />
          <BowlingCard bowlingCard={innings1Bowling} />
          <ExtrasCard extras={innings1Extras} />
          <PartnershipCard partnerships={innings1Partnerships} />
        </>
      )}
      {selectedInnings === "2" && innings2.data?.Innings2 && (
        <>
          <BattingCard battingCard={innings2Batting} />
          <BowlingCard bowlingCard={innings2Bowling} />
          <ExtrasCard extras={innings2Extras} />
          <PartnershipCard partnerships={innings2Partnerships} />
        </>
      )}
    </div>
  );
}

export { default as ScoreCard } from "./ScoreCard";
