
export interface Note {
  id: string;
  title: string;
  description: string;
  created_at: string;
};

export const notesEndpoint = 'http://localhost:8888/notes';