import { notFound } from "next/navigation";

import { getNoteById } from "@/lib/api/notes";

import NoteDetailsClient from "./NoteDetails.client";

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

  return <NoteDetailsClient note={note} />;
}
