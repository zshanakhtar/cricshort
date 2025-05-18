import type { PointEntry } from "~/models/points";
import { PointsRow } from "./PointsRow";

interface PointsTableProps {
  points: PointEntry[];
}

export const PointsTable = ({ points }: PointsTableProps) => (
  <div className="from-secondary-light-950 to-secondary-light-800 dark:from-secondary-dark-400 dark:to-secondary-dark-200 overflow-x-auto rounded-2xl bg-gradient-to-br shadow-md">
    <table className="min-w-full text-lg">
      <thead>
        <tr className="bg-accent-primary-light-950 dark:bg-accent-primary-dark-50">
          <th className="text-accent-secondary-light-500 dark:text-accent-secondary-dark-500 px-3 py-2 text-lg font-bold sm:text-sm">
            #
          </th>
          <th className="text-accent-secondary-light-500 dark:text-accent-secondary-dark-500 px-3 py-2 text-left text-lg font-bold sm:text-sm">
            Team
          </th>
          <th className="text-accent-secondary-light-500 dark:text-accent-secondary-dark-500 px-3 py-2 text-lg font-bold sm:text-sm">
            M
          </th>
          <th className="text-accent-secondary-light-500 dark:text-accent-secondary-dark-500 px-3 py-2 text-lg font-bold sm:text-sm">
            Pts
          </th>
          <th className="text-accent-secondary-light-500 dark:text-accent-secondary-dark-500 px-3 py-2 text-lg font-bold sm:text-sm">
            W
          </th>
          <th className="text-accent-secondary-light-500 dark:text-accent-secondary-dark-500 px-3 py-2 text-lg font-bold sm:text-sm">
            L
          </th>
          <th className="text-accent-secondary-light-500 dark:text-accent-secondary-dark-500 px-3 py-2 text-lg font-bold sm:text-sm">
            NR
          </th>
          <th className="text-accent-secondary-light-500 dark:text-accent-secondary-dark-500 px-3 py-2 text-lg font-bold sm:text-sm">
            NRR
          </th>
          <th className="text-accent-secondary-light-500 dark:text-accent-secondary-dark-500 px-3 py-2 text-lg font-bold sm:text-sm">
            Form
          </th>
        </tr>
      </thead>
      <tbody>
        {points.map((entry, idx) => (
          <PointsRow key={entry.TeamID} entry={entry} idx={idx} />
        ))}
      </tbody>
    </table>
  </div>
);
