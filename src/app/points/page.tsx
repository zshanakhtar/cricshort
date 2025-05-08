import { api } from "~/trpc/server";
import { PointsTable } from "../_components/points/PointsTable";

export default async function PointsPage() {
  const points = await api.points.getPoints();
  return <PointsTable points={points} />;
}
