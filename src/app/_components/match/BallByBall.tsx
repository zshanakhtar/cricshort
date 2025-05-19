import type { BallByBall } from "~/models/innings";

interface BallByBallProps {
  ballByBall: BallByBall[];
}

export function BallByBall({ ballByBall }: BallByBallProps) {
  const oversMap = ballByBall.reduce(
    (acc, ball) => {
      const key = ball.OverNo;
      acc[key] ??= [];
      acc[key].push(ball);
      return acc;
    },
    {} as Record<number, BallByBall[]>,
  );

  const sortedOvers = Object.entries(oversMap)
    .map(([overNo, balls]) => ({
      overNo: Number(overNo),
      balls: balls.sort((a, b) => Number(a.BallNo) - Number(b.BallNo)),
    }))
    .sort((a, b) => b.overNo - a.overNo);

  return (
    <div className="space-y-6">
      <h2 className="text-accent-primary-light-800 dark:text-accent-primary-dark-800 mb-4 text-lg font-bold">
        Commentary
      </h2>

      {sortedOvers.map(({ overNo, balls }) => {
        const runsSummary = balls
        .filter((ball) => ball.BallID && ball.BatsManName)
          .map((ball) => {
            if (ball.IsWicket === "true") return "W";
            if (ball.BallRuns && ball.BallRuns !== "0") return ball.BallRuns;
            return "0";
          });

        return (
          <div
            key={overNo}
            className="from-secondary-light-800 to-secondary-light-900 dark:from-secondary-dark-100 dark:to-secondary-dark-200 rounded-2xl bg-gradient-to-br p-4 shadow-md"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="text-accent-primary-light-600 dark:text-accent-primary-dark-600 text-sm font-semibold">
                Over {overNo}
              </div>
              <div className="text-primary-light-400 dark:text-primary-dark-600 font-mono text-sm tracking-widest">
                {runsSummary.map((run, i) => (
                    <span key={i} className="rounded-full border px-1 text-center text-accent-primary-dark-500 border-accent-primary-dark-500 m-1">
                      {run}
                    </span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {balls.filter((ball) => ball.BallID && ball.BatsManName).map((ball) => (
                <div
                  key={
                    ball.BallUniqueID ??
                    `${ball.MatchID}-${ball.InningsNo}-${ball.BallID}`
                  }
                  className="border-accent-primary-light-400 items-center dark:border-accent-primary-dark-400 flex gap-3 rounded-lg border bg-transparent p-3"
                >
                  <div className="text-accent-primary-light-600 dark:text-accent-primary-dark-600 h-6 w-6 font-mono text-lg font-bold">
                    {/* <span className="h-full align-middle "> */}
                      {ball.IsWicket === "true"
                        ? "W"
                        : ball.IsDotball === "true"
                          ? "."
                          : ball.IsNoBall === "true"
                            ? "NB"
                            : ball.IsWide === "true"
                              ? "WD"
                              : ball.BallRuns}
                    {/* </span> */}
                  </div>

                  <div className="text-primary-light-600 dark:text-secondary-dark-800  flex-1 text-xs">
                    <div className="font-semibold">{ball.BatsManName}</div>
                    <div
                      className=" text-primary-light-800 dark:text-primary-dark-800 whitespace-pre-wrap"
                      title={ball.Commentry ?? ball.RunsText ?? "-"}
                    >
                      {ball.Commentry ?? ball.RunsText ?? "-"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
