import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { noteByIdQueryOptions } from "@/lib/api";
import { createQueryClient } from "@/lib/query-client";
import type { Note } from "@/types/note";

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
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery(noteByIdQueryOptions(id));
  const note = queryClient.getQueryData<Note | null>(
    noteByIdQueryOptions(id).queryKey,
  );

  if (!note) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}
