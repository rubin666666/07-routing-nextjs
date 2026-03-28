"use client";

import { useQuery } from "@tanstack/react-query";

import NoteList from "@/components/NoteList/NoteList";
import { getNotes } from "@/lib/api/notes";
import type { NoteTag, NotesResponse } from "@/types/note";

import css from "./Notes.module.css";

interface NotesPageClientProps {
  activeTag: NoteTag | "all";
  initialData: NotesResponse;
}

export default function NotesPageClient({
  activeTag,
  initialData,
}: NotesPageClientProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", activeTag],
    queryFn: () => getNotes(activeTag === "all" ? {} : { tag: activeTag }),
    initialData,
  });

  if (isLoading) {
    return <p className={css.message}>Loading notes...</p>;
  }

  if (isError) {
    return (
      <p className={css.message}>Something went wrong while loading notes.</p>
    );
  }

  if (data.notes.length === 0) {
    return <p className={css.message}>No notes found for this filter.</p>;
  }

  return (
    <div className={css.container}>
      <p className={css.counter}>Total pages: {data.totalPages}</p>
      <NoteList notes={data.notes} />
    </div>
  );
}
