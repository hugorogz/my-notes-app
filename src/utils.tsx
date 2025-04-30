
export interface Note {
  id: string;
  title: string;
  description: string;
};

export const notesEndpoint = 'http://localhost:8888/notes';