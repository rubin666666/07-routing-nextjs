"use client";

import NoteDetails from "@/components/NoteDetails/NoteDetails";
import type { Note } from "@/types/note";

interface NoteDetailsClientProps {
  note: Note;
}

export default function NoteDetailsClient({ note }: NoteDetailsClientProps) {
  return <NoteDetails note={note} />;
}
