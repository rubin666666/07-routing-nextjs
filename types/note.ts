export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NotesQueryParams {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: "created" | "updated";
  tag?: NoteTag;
}
