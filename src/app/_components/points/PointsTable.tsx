import type { PointEntry } from "~/models/points";
import { PointsRow } from "./PointsRow";

interface PointsTableProps {
  points: PointEntry[];
}

export const PointsTable = ({ points }: PointsTableProps) => (
  <div className="overflow-x-auto rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-md">
    <table className="min-w-full text-lg">
      <thead>
        <tr className="bg-blue-50">
          <th className="px-3 py-2 text-lg font-bold text-blue-700">#</th>
          <th className="px-3 py-2 text-left text-lg font-bold text-blue-700">
            Team
          </th>
          <th className="px-3 py-2 text-lg font-bold text-blue-700">M</th>
          <th className="px-3 py-2 text-lg font-bold text-blue-700">W</th>
          <th className="px-3 py-2 text-lg font-bold text-blue-700">L</th>
          <th className="px-3 py-2 text-lg font-bold text-blue-700">NR</th>
          <th className="px-3 py-2 text-lg font-bold text-blue-700">Pts</th>
          <th className="px-3 py-2 text-lg font-bold text-blue-700">NRR</th>
          <th className="px-3 py-2 text-lg font-bold text-blue-700">Form</th>
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
