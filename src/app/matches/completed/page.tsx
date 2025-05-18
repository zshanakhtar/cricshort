import { FilterTabs } from "~/app/_components/schedule/FilterTabs";
import { MatchList } from "~/app/_components/schedule/MatchList";
import { api } from "~/trpc/server";

export default async function CompletedMatchesPage() {
  const matches = await api.matches.getAllMatches();

  return (
    <>
      <FilterTabs currentFilter="completed" />
      <MatchList matches={matches} filter="completed" />
    </>
  );
}
