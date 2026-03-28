import Link from "next/link";

import type { Note } from "@/types/note";

import css from "./NoteDetails.module.css";

interface NoteDetailsProps {
  note: Note;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function NoteDetails({ note }: NoteDetailsProps) {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <article className={css.item}>
          <Link href="/notes/filter/all" className={css.backBtn}>
            Back to notes
          </Link>

          <header className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </header>

          <p className={css.content}>{note.content || "No content"}</p>
          <p className={css.date}>Updated: {formatDate(note.updatedAt)}</p>
        </article>
      </div>
    </main>
  );
}
