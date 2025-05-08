export default function TeamPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Teams & Points Table</h1>

      {/* Points Table */}
      <div className="overflow-x-auto rounded-2xl bg-gradient-to-br from-white to-gray-50 p-2 shadow-md">
        <table className="min-w-full divide-y divide-gray-100">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-500 uppercase">
                Team
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold tracking-wider text-gray-500 uppercase">
                P
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold tracking-wider text-gray-500 uppercase">
                W
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold tracking-wider text-gray-500 uppercase">
                L
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold tracking-wider text-gray-500 uppercase">
                NRR
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold tracking-wider text-gray-500 uppercase">
                PTS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <tr className="transition-colors hover:bg-blue-50/40">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
                    {/* Team logo here */}
                  </div>
                  <span className="font-semibold text-gray-800">
                    Chennai Super Kings
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                8
              </td>
              <td className="px-6 py-4 text-center text-base font-medium text-green-600">
                6
              </td>
              <td className="px-6 py-4 text-center text-base font-medium text-red-500">
                2
              </td>
              <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                +0.823
              </td>
              <td className="px-6 py-4 text-center text-base font-bold">
                <span className="inline-block rounded bg-blue-100 px-3 py-1 text-blue-700">
                  12
                </span>
              </td>
            </tr>
            {/* Add more rows for other teams */}
          </tbody>
        </table>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Team Card */}
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-md transition-shadow duration-200 hover:shadow-xl">
          <div className="h-32 bg-indigo-600"></div>
          <div className="flex flex-col gap-3 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow"></div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Mumbai Indians
                </h3>
                <p className="text-sm text-gray-500">5 times champion</p>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-gray-800">8</p>
                <p className="text-xs text-gray-500">Matches</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">5</p>
                <p className="text-xs text-gray-500">Won</p>
              </div>
              <div>
                <p className="text-lg font-bold text-blue-700">10</p>
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
