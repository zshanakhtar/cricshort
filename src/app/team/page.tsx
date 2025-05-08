export default function TeamPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Teams & Points Table</h1>

      {/* Points Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Team
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                P
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                W
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                L
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                NRR
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                PTS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                  <span className="font-medium">Chennai Super Kings</span>
                </div>
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">8</td>
              <td className="px-6 py-4 text-center whitespace-nowrap">6</td>
              <td className="px-6 py-4 text-center whitespace-nowrap">2</td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                +0.823
              </td>
              <td className="px-6 py-4 text-center font-medium whitespace-nowrap">
                12
              </td>
            </tr>
            {/* Add more rows for other teams */}
          </tbody>
        </table>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Team Card */}
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <div className="h-32 bg-indigo-600"></div>
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-16 w-16 rounded-full bg-gray-200"></div>
              <div>
                <h3 className="font-bold">Mumbai Indians</h3>
                <p className="text-sm text-gray-500">5 times champion</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold">8</p>
                <p className="text-xs text-gray-500">Matches</p>
              </div>
              <div>
                <p className="text-lg font-bold">5</p>
                <p className="text-xs text-gray-500">Won</p>
              </div>
              <div>
                <p className="text-lg font-bold">10</p>
                <p className="text-xs text-gray-500">Points</p>
              </div>
            </div>
          </div>
        </div>

        {/* Repeat similar cards for other teams */}
      </div>
    </div>
  );
}
