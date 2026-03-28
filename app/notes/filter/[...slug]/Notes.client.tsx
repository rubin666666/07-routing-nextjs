"use client";

import NotesClient from "@/components/NotesClient/NotesClient";
import type { NoteTag, NotesResponse } from "@/types/note";

interface NotesPageClientProps {
  activeTag: NoteTag | "all";
  initialData: NotesResponse;
}

export default function NotesPageClient({
  activeTag,
  initialData,
}: NotesPageClientProps) {
  return <NotesClient activeTag={activeTag} initialData={initialData} />;
}
