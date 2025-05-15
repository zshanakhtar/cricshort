import type { PointEntry } from "~/models/points";

interface PointsRowProps {
  entry: PointEntry;
  idx: number;
}

export const PointsRow = ({ entry }: PointsRowProps) => (
  <tr className="text-center text-2xl transition-colors hover:bg-blue-100/40">
    <td className="px-10 py-4 font-medium text-gray-700">{entry.OrderNo}</td>
    <td className="flex items-center gap-6 px-10 py-4 text-left">
      {entry.TeamName && entry.TeamLogo && (
    // eslint-disable-next-line @next/next/no-img-element
      <img
        src={entry.TeamLogo}
        alt={entry.TeamName}
        className="h-8 w-8 rounded-full bg-white shadow"
      />
      )}
      <span className="font-semibold text-gray-800">{entry.TeamName}</span>
    </td>
    <td className="px-10 py-4">{entry.Matches}</td>
    <td className="px-10 py-4">{entry.Wins}</td>
    <td className="px-10 py-4">{entry.Loss}</td>
    <td className="px-10 py-4">{entry.NoResult}</td>
    <td className="px-10 py-4 font-bold text-blue-700">{entry.Points}</td>
    <td className="px-10 py-4">{entry.NetRunRate}</td>
    <td className="px-10 py-4">
      <span className="inline-flex min-w-[80px] gap-3">
        {entry.Performance?.split(",").map((res, i) => {
          if (res === "W") {
            return (
              <span
                key={i}
                className="inline-block h-5 w-5 rounded-full bg-blue-600 align-middle"
                title="Win"
              />
            );
          }
          if (res === "L") {
            return (
              <span
                key={i}
                className="inline-block h-5 w-5 rounded-full border-2 border-blue-600 bg-transparent align-middle"
                title="Loss"
              />
            );
          }
          // For N (No Result), T (Tie), or others
          return (
            <span
              key={i}
              className="inline-block h-5 w-5 rounded-full bg-gray-300 align-middle"
              title={res === "N" ? "No Result" : res === "T" ? "Tie" : res}
            />
          );
        })}
      </span>
    </td>
  </tr>
);
