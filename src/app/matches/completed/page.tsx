"use client";

import { FilterTabs } from "~/app/_components/schedule/FilterTabs";
import { MatchList } from "~/app/_components/schedule/MatchList";
import { api } from "~/trpc/react";

export default function CompletedMatchesPage() {
  const [matches] = api.matches.getAllMatches.useSuspenseQuery();

  return (
    <>
      <FilterTabs currentFilter="completed" />
      <MatchList matches={matches} filter="completed" />
    </>
  );
}
