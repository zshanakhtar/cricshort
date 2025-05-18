"use client";

import { useState } from "react";
import type { Matches } from "~/models/matches";
import { FilterTabs } from "./FilterTabs";
import { MatchList } from "./MatchList";

export const ScheduleClient = ({ matches }: { matches: Matches }) => {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Match Schedule</h1>
      <FilterTabs currentFilter={filter} onFilterChange={setFilter} />
      <MatchList matches={matches} filter={filter} />
    </div>
  );
};
