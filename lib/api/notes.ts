import axios from "axios";

import { getAuthToken } from "@/lib/api/auth";
import { notehubApi } from "@/lib/api/client";
import type { Note, NotesQueryParams, NotesResponse } from "@/types/note";

async function createAuthorizedConfig() {
  const token = await getAuthToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function getNotes(
  params: NotesQueryParams = {},
): Promise<NotesResponse> {
  const config = await createAuthorizedConfig();

  const { data } = await notehubApi.get<NotesResponse>("/notes", {
    ...config,
    params,
  });

  return data;
}

export async function getNoteById(id: string): Promise<Note | null> {
  try {
    const config = await createAuthorizedConfig();
    const { data } = await notehubApi.get<Note>(`/notes/${id}`, config);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }

    throw error;
  }
}
