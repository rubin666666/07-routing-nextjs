"use client";

import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import type { Note } from "@/types/note";

interface NotePreviewClientProps {
  note: Note;
}

export default function NotePreviewClient({ note }: NotePreviewClientProps) {
  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}
