"use client";

import { useState } from "react";
import type { Matches } from "~/models/matches";
import { FilterTabs } from "./FilterTabs";
import { MatchList } from "./MatchList";

export const ScheduleClient = ({ matches }: { matches: Matches }) => {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");

  return (
    <>
      <FilterTabs currentFilter={filter} onFilterChange={setFilter} />
      <MatchList matches={matches} filter={filter} />
    </>
  );
};
