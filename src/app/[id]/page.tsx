import { notFound } from "next/navigation";
import { getEncounterById } from "@/app/api/encounters/data";
import { Encounter } from "@/components/Encounter/Encounter";

export default async function EncounterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const encounter = getEncounterById(id);

  if (!encounter) {
    notFound();
  }

  return <Encounter encounter={encounter} />;
}
