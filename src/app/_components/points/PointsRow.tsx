import type { PointEntry } from "~/models/points";

interface PointsRowProps {
  entry: PointEntry;
  idx: number;
}

export const PointsRow = ({ entry, idx }: PointsRowProps) => (
  <tr className="text-center transition-colors hover:bg-blue-100/40">
    <td className="px-3 py-1 font-medium text-gray-700">{entry.OrderNo}</td>
    <td className="flex items-center gap-2 px-3 py-1 text-left">
      <img
        src={entry.TeamLogo}
        alt={entry.TeamName}
        className="h-6 w-6 rounded-full bg-white shadow"
      />
      <span className="font-semibold text-gray-800">{entry.TeamName}</span>
    </td>
    <td className="px-3 py-1">{entry.Matches}</td>
    <td className="px-3 py-1">{entry.Wins}</td>
    <td className="px-3 py-1">{entry.Loss}</td>
    <td className="px-3 py-1">{entry.NoResult}</td>
    <td className="px-3 py-1 font-bold text-blue-700">{entry.Points}</td>
    <td className="px-3 py-1">{entry.NetRunRate}</td>
    <td className="px-3 py-1">
      <span className="inline-block min-w-[60px] font-mono text-xs">
        {entry.Performance}
      </span>
    </td>
  </tr>
);
