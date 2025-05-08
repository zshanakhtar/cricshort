export default function MatchPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Live Match</h1>

      {/* Live Match Card */}
      <div className="rounded-lg bg-white p-4 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-red-500 px-2 py-1 text-xs text-white">
            LIVE
          </span>
          <span className="text-sm text-gray-500">Mumbai</span>
        </div>

        <div className="space-y-4">
          {/* Teams */}
          <div className="flex justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-gray-200"></div>
              <div>
                <p className="font-semibold">Mumbai Indians</p>
                <p className="text-xl font-bold">180/4</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div>
                <p className="text-right font-semibold">Chennai Super Kings</p>
                <p className="text-right text-xl font-bold">120/2</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-200"></div>
            </div>
          </div>

          {/* Match Info */}
          <div className="text-sm text-gray-600">
            <p>CSK needs 61 runs in 42 balls</p>
          </div>

          {/* Recent Balls */}
          <div className="flex space-x-2">
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs">
              1
            </span>
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs">
              4
            </span>
            <span className="rounded-full bg-red-100 px-2 py-1 text-xs">W</span>
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs">
              2
            </span>
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs">
              6
            </span>
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs">
              1
            </span>
          </div>
        </div>
      </div>

      {/* Match Details Tabs */}
      <div className="mt-4 rounded-lg bg-white p-4 shadow-md">
        <div className="flex space-x-4 border-b">
          <button className="border-b-2 border-indigo-600 pb-2 font-medium text-indigo-600">
            Live
          </button>
          <button className="pb-2 text-gray-500 hover:text-gray-700">
            Scorecard
          </button>
          <button className="pb-2 text-gray-500 hover:text-gray-700">
            Commentary
          </button>
        </div>
        <div className="mt-4">
          <p className="text-gray-600">
            Live commentary and updates will appear here...
          </p>
        </div>
      </div>
    </div>
  );
}
