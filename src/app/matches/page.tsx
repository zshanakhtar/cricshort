import { api } from "~/trpc/server";
import { FilterTabs } from "../_components/schedule/FilterTabs";
import { MatchList } from "../_components/schedule/MatchList";

export default async function SchedulePage() {
  const matches = await api.matches.getAllMatches();
  return (
    <>
        <FilterTabs currentFilter="all" />
        <MatchList matches={matches} filter="all" />
        </>
  );
}
