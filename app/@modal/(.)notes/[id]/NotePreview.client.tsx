"use client";

import { useRouter } from "next/navigation";

import Modal from "@/components/Modal/Modal";
import type { Note } from "@/types/note";

import css from "./NotePreview.module.css";

interface NotePreviewClientProps {
  note: Note;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function NotePreviewClient({ note }: NotePreviewClientProps) {
  const router = useRouter();

  return (
    <Modal>
      <div className={css.container}>
        <article className={css.item}>
          <button className={css.backBtn} onClick={() => router.back()}>
            Close
          </button>

          <header className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </header>

          <p className={css.content}>{note.content || "No content"}</p>
          <p className={css.date}>Updated: {formatDate(note.updatedAt)}</p>
        </article>
      </div>
    </Modal>
  );
}
