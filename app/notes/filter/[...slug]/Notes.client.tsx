"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import {
  createNote,
  NOTES_PER_PAGE,
  notesKeys,
  notesListQueryOptions,
} from "@/lib/api";
import type { CreateNotePayload, NoteTag } from "@/types/note";

import css from "./Notes.module.css";

interface NotesPageClientProps {
  activeTag: NoteTag | "all";
}

function buildUrl(
  searchParams: URLSearchParams,
  updates: Record<string, string | null>,
) {
  const params = new URLSearchParams(searchParams.toString());

  Object.entries(updates).forEach(([key, value]) => {
    if (!value) {
      params.delete(key);
      return;
    }

    params.set(key, value);
  });

  const query = params.toString();

  return query ? `?${query}` : "";
}

export default function NotesPageClient({ activeTag }: NotesPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(() => {
    return searchParams.get("search") ?? "";
  });
  const [debouncedSearch] = useDebounce(searchValue, 500);
  const currentPage = Math.max(Number(searchParams.get("page") ?? "1") || 1, 1);

  useEffect(() => {
    const currentSearch = searchParams.get("search") ?? "";
    const normalizedSearch = debouncedSearch.trim();

    if (currentSearch === normalizedSearch) {
      return;
    }

    const nextUrl = buildUrl(searchParams, {
      page: "1",
      search: normalizedSearch || null,
    });

    router.replace(nextUrl, { scroll: false });
  }, [debouncedSearch, router, searchParams]);

  const queryParams = useMemo(
    () => ({
      page: currentPage,
      perPage: NOTES_PER_PAGE,
      ...(debouncedSearch.trim() ? { search: debouncedSearch.trim() } : {}),
      ...(activeTag === "all" ? {} : { tag: activeTag }),
    }),
    [activeTag, currentPage, debouncedSearch],
  );

  const { data, isLoading, isError, error } = useQuery({
    ...notesListQueryOptions(queryParams),
    refetchOnMount: false,
  });

  const createNoteMutation = useMutation({
    mutationFn: (payload: CreateNotePayload) => createNote(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: notesKeys.all });
      setIsNoteFormOpen(false);
    },
  });

  const handlePageChange = (selectedPage: number) => {
    const nextUrl = buildUrl(searchParams, {
      page: String(selectedPage + 1),
      search: debouncedSearch.trim() || null,
    });

    router.push(nextUrl, { scroll: false });
  };

  if (isLoading) {
    return <p className={css.message}>Loading notes...</p>;
  }

  if (isError) {
    return (
      <p className={css.message}>
        Something went wrong while loading notes: {error.message}
      </p>
    );
  }

  if (!data) {
    return <p className={css.message}>No data available.</p>;
  }

  if (data.notes.length === 0) {
    return (
      <div className={css.container}>
        <div className={css.toolbar}>
          <div className={css.actions}>
            <SearchBox value={searchValue} onChange={setSearchValue} />
            <button
              type="button"
              className={css.button}
              onClick={() => setIsNoteFormOpen(true)}
            >
              Create note
            </button>
          </div>
        </div>

        {isNoteFormOpen && (
          <Modal onClose={() => setIsNoteFormOpen(false)}>
            <NoteForm
              onSubmit={(values) => {
                createNoteMutation.mutate(values);
              }}
            />
          </Modal>
        )}

        <p className={css.message}>No notes found for this filter.</p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <div className={css.toolbar}>
        <div className={css.actions}>
          <SearchBox value={searchValue} onChange={setSearchValue} />
          <button
            type="button"
            className={css.button}
            onClick={() => setIsNoteFormOpen(true)}
          >
            Create note
          </button>
        </div>
        <p className={css.counter}>Total pages: {data.totalPages}</p>
      </div>

      {isNoteFormOpen && (
        <Modal onClose={() => setIsNoteFormOpen(false)}>
          <NoteForm
            onSubmit={(values) => {
              createNoteMutation.mutate(values);
            }}
          />
        </Modal>
      )}

      <NoteList notes={data.notes} />
      <Pagination
        pageCount={data.totalPages}
        currentPage={currentPage - 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
