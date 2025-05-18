import type { PointEntry } from "~/models/points";

interface PointsRowProps {
  entry: PointEntry;
  idx: number;
}

export const PointsRow = ({ entry }: PointsRowProps) => (
  <tr className="hover:bg-accent-primary-light-950/20 dark:hover:bg-accent-primary-dark-50/20 text-center text-2xl transition-colors sm:text-base text-primary-light-800 dark:text-primary-dark-800">
    <td className="text-primary-light-400 dark:text-primary-dark-500 px-10 py-4 font-medium">
      {entry.OrderNo}
    </td>
    <td className="flex items-center gap-6 px-2 py-4 text-left">
      {entry.TeamName && entry.TeamLogo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={entry.TeamLogo}
          alt={entry.TeamCode ?? entry.TeamName}
          className="bg-secondary-light-950 dark:bg-secondary-dark-400 h-8 w-8 rounded-full shadow"
        />
      )}
      <span className="text-primary-light-500 dark:text-primary-dark-400 font-semibold">
        {entry.TeamCode ?? entry.TeamName}
      </span>
    </td>
    <td className="px-10 py-4">{entry.Matches}</td>
    <td className="text-accent-secondary-light-500 dark:text-accent-secondary-dark-500 px-10 py-4 font-bold">
      {entry.Points}
    </td>
    <td className="px-10 py-4">{entry.Wins}</td>
    <td className="px-10 py-4">{entry.Loss}</td>
    <td className="px-10 py-4">{entry.NoResult}</td>
    <td className="px-10 py-4">{entry.NetRunRate}</td>
    <td className="px-10 py-4">
      <span className="inline-flex min-w-[80px] gap-3">
        {entry.Performance?.split(",").map((res, i) => {
          if (res === "W") {
            return (
              <span
                key={i}
                className="bg-accent-secondary-light-500 dark:bg-accent-secondary-dark-500 inline-block h-5 w-5 rounded-full align-middle"
                title="Win"
              />
            );
          }
          if (res === "L") {
            return (
              <span
                key={i}
                className="border-accent-secondary-light-500 dark:border-accent-secondary-dark-500 inline-block h-5 w-5 rounded-full border-2 bg-transparent align-middle"
                title="Loss"
              />
            );
          }
          // For N (No Result), T (Tie), or others
          return (
            <span
              key={i}
              className="bg-secondary-light-200 dark:bg-secondary-dark-800 inline-block h-5 w-5 rounded-full align-middle"
              title={res === "N" ? "No Result" : res === "T" ? "Tie" : res}
            />
          );
        })}
      </span>
    </td>
  </tr>
);
