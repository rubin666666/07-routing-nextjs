import { notFound } from "next/navigation";

import { getNoteById } from "@/lib/api/notes";

import NotePreviewClient from "./NotePreview.client";

interface NotePreviewModalPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NotePreviewModalPage({
  params,
}: NotePreviewModalPageProps) {
  const { id } = await params;
  const note = await getNoteById(id);

  if (!note) {
    notFound();
  }

  return <NotePreviewClient note={note} />;
}
