import React from "react";
import type { PartnershipScore } from "~/models/innings";

interface DisplayPartnership extends PartnershipScore {
  left: string;
  right: string;
  leftID: string;
  rightID: string;
}

function getUniquePartnerships(
  partnerships: PartnershipScore[],
): DisplayPartnership[] {
  if (!partnerships || partnerships.length === 0) return [];
  const unique: DisplayPartnership[] = [];
  for (let i = 0; i < partnerships.length; i++) {
    const p = partnerships[i];
    if (!p) continue;
    const safeP = {
      ...p,
      MatchID: p.MatchID ?? "",
      BattingTeamID: p.BattingTeamID ?? "",
      InningsNo: p.InningsNo ?? "",
      StrikerID: p.StrikerID ?? "",
      Striker: p.Striker ?? "",
      NonStrikerID: p.NonStrikerID ?? "",
      NonStriker: p.NonStriker ?? "",
      PartnershipTotal: p.PartnershipTotal ?? 0,
      StrikerRuns: p.StrikerRuns ?? 0,
      StrikerBalls: p.StrikerBalls ?? 0,
      Extras: p.Extras ?? 0,
      NonStrikerRuns: p.NonStrikerRuns ?? 0,
      NonStrikerBalls: p.NonStrikerBalls ?? 0,
      MatchMaxOver: p.MatchMaxOver ?? 0,
      MatchMinOver: p.MatchMinOver ?? 0,
      RowNumber: p.RowNumber ?? i,
    };
    if (i === 0) {
      unique.push({
        ...safeP,
        left: safeP.Striker,
        right: safeP.NonStriker,
        leftID: safeP.StrikerID,
        rightID: safeP.NonStrikerID,
      });
      continue;
    }
    const prev = unique[unique.length - 1];
    if (
      prev &&
      (safeP.StrikerID === prev.leftID || safeP.NonStrikerID === prev.leftID)
    ) {
      if (prev && safeP.StrikerID === prev.leftID) {
        unique.push({
          ...safeP,
          left: safeP.Striker,
          right: safeP.NonStriker,
          leftID: safeP.StrikerID,
          rightID: safeP.NonStrikerID,
        });
      } else {
        unique.push({
          ...safeP,
          left: safeP.NonStriker,
          right: safeP.Striker,
          leftID: safeP.NonStrikerID,
          rightID: safeP.StrikerID,
        });
      }
    } else if (
      prev &&
      (safeP.StrikerID === prev.rightID || safeP.NonStrikerID === prev.rightID)
    ) {
      if (prev && safeP.StrikerID === prev.rightID) {
        unique.push({
          ...safeP,
          left: safeP.NonStriker,
          right: safeP.Striker,
          leftID: safeP.NonStrikerID,
          rightID: safeP.StrikerID,
        });
      } else {
        unique.push({
          ...safeP,
          left: safeP.Striker,
          right: safeP.NonStriker,
          leftID: safeP.StrikerID,
          rightID: safeP.NonStrikerID,
        });
      }
    } else {
      unique.push({
        ...safeP,
        left: safeP.Striker,
        right: safeP.NonStriker,
        leftID: safeP.StrikerID,
        rightID: safeP.NonStrikerID,
      });
    }
  }
  return unique.filter((p, i, arr) => {
    if (i === 0) return true;
    const prev = arr[i - 1];
    if (!prev) return true;
    if (!p) return true;
    return !(p.leftID === prev.leftID && p.rightID === prev.rightID);
  });
}

export function PartnershipCard({
  partnerships,
}: {
  partnerships: PartnershipScore[];
}) {
  if (!partnerships || partnerships.length === 0) return null;
  const uniquePartnerships = getUniquePartnerships(partnerships);
  const maxPartnership = Math.max(
    ...uniquePartnerships.map((p) => Number(p.PartnershipTotal) || 0),
    1,
  );
  return (
    <div className="mb-8">
      <h2 className="text-primary-700 mb-2 text-lg font-bold">Partnerships</h2>
      <div className="flex flex-col gap-4">
        {uniquePartnerships.filter(Boolean).map((p, idx) => {
          if (!p) return null;
          const runs1 = Number(
            p.leftID === p.StrikerID ? p.StrikerRuns : p.NonStrikerRuns,
          );
          const balls1 = Number(
            p.leftID === p.StrikerID ? p.StrikerBalls : p.NonStrikerBalls,
          );
          const runs2 = Number(
            p.rightID === p.StrikerID ? p.StrikerRuns : p.NonStrikerRuns,
          );
          const balls2 = Number(
            p.rightID === p.StrikerID ? p.StrikerBalls : p.NonStrikerBalls,
          );
          const total = runs1 + runs2;
          const leftIsHigher = runs1 >= runs2;
          return (
            <div
              key={p.RowNumber || idx}
              className="flex flex-col gap-2 rounded-xl bg-white/80 p-4 shadow"
            >
              <div className="relative mb-1 flex items-center justify-between">
                <span className="font-semibold text-gray-800">{p.left}</span>
                <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0 text-sm">
                  <span className="font-bold text-blue-700">
                    {p.PartnershipTotal}
                    {"("}
                    {balls1 + balls2}
                    {")"}
                  </span>
                  {Number(p.Extras) > 0 && (
                    <span className="text-xs text-gray-500">
                      Extras: {p.Extras}
                    </span>
                  )}
                </div>
                <span className="font-semibold text-gray-800">{p.right}</span>
              </div>
              <div className="relative flex h-8 w-full items-center rounded border border-blue-200 bg-blue-50">
                <div
                  className="absolute top-0 left-1/2 h-full"
                  style={{
                    width: 0,
                    borderLeft: "1px solid #3b82f6",
                    zIndex: 1,
                  }}
                />
                <div
                  className={`absolute top-0 right-1/2 flex h-full items-center justify-end text-xs font-bold transition-all duration-300 ${leftIsHigher ? "bg-blue-600 text-white" : "border-2 border-blue-600 bg-white text-blue-700"}`}
                  style={{
                    width: `${((Number(p.PartnershipTotal) / maxPartnership) * (runs1 / (total || 1)) * 100) / 2}%`,
                    minWidth: 48,
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    zIndex: 2,
                  }}
                >
                  <span className="px-2">
                    {runs1}({balls1})
                  </span>
                </div>
                <div
                  className={`absolute top-0 left-1/2 flex h-full items-center justify-start text-xs font-bold transition-all duration-300 ${!leftIsHigher ? "bg-blue-600 text-white" : "border-2 border-blue-600 bg-white text-blue-700"}`}
                  style={{
                    width: `${((Number(p.PartnershipTotal) / maxPartnership) * (runs2 / (total || 1)) * 100) / 2}%`,
                    minWidth: 48,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    zIndex: 2,
                  }}
                >
                  <span className="px-2">
                    {runs2}({balls2})
                  </span>
                </div>
              </div>
              <span className="w-full text-right text-xs text-gray-500">
                Overs: {p.MatchMinOver} - {p.MatchMaxOver}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
