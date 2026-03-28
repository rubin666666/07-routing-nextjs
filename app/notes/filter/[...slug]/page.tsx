import { notFound } from "next/navigation";

import NotesClient from "@/components/NotesClient/NotesClient";
import { getNotes } from "@/lib/api/notes";
import type { NoteTag } from "@/types/note";

import css from "./page.module.css";

const allowedTags: NoteTag[] = [
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];

interface NotesByTagPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

function parseTag(slug: string[]) {
  if (slug.length !== 1) {
    notFound();
  }

  const [tag] = slug;

  if (tag === "all") {
    return "all" as const;
  }

  if (!allowedTags.includes(tag as NoteTag)) {
    notFound();
  }

  return tag as NoteTag;
}

export default async function NotesByTagPage({ params }: NotesByTagPageProps) {
  const { slug } = await params;
  const activeTag = parseTag(slug);
  const initialData = await getNotes(
    activeTag === "all" ? {} : { tag: activeTag },
  );

  return (
    <main className={css.app}>
      <div className={css.toolbar}>
        <h1 className={css.title}>Notes</h1>
      </div>

      <NotesClient activeTag={activeTag} initialData={initialData} />
    </main>
  );
}
