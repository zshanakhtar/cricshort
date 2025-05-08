import { api } from "~/trpc/server";
import { ScheduleClient } from "../_components/schedule/ScheduleClient";

export default async function SchedulePage() {
  const matches = await api.matches.getAllMatches();
  return <ScheduleClient matches={matches} />;
}
