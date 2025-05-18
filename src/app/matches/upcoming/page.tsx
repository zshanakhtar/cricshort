import { FilterTabs } from "~/app/_components/schedule/FilterTabs";
import { MatchList } from "~/app/_components/schedule/MatchList";
import { api } from "~/trpc/server";

export default async function OngoingSchedulePage() {
  const matches = await api.matches.getAllMatches();

  return (
    <>
      <FilterTabs currentFilter="upcoming" />
      <MatchList matches={matches} filter="upcoming" />
    </>
  );
}
