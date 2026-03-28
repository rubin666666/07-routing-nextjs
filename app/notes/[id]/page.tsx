import { notFound } from "next/navigation";

import NoteDetails from "@/components/NoteDetails/NoteDetails";
import { getNoteById } from "@/lib/api/notes";

interface NoteDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;
  const note = await getNoteById(id);

  if (!note) {
    notFound();
  }

  return <NoteDetails note={note} />;
}
