"use client";

import { useQuery } from "@tanstack/react-query";

import { getNotes } from "@/lib/api/notes";
import type { NoteTag, NotesResponse } from "@/types/note";

import NoteList from "../NoteList/NoteList";
import css from "./NotesClient.module.css";

interface NotesClientProps {
  activeTag: NoteTag | "all";
  initialData: NotesResponse;
}

export default function NotesClient({
  activeTag,
  initialData,
}: NotesClientProps) {
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
