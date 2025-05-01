
export interface Note {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string | null;
};

export const notesEndpoint = 'http://localhost:8888/notes/';

export const getUserId = () => {
  const stored = sessionStorage.getItem('selectedUser');
  return stored ? JSON.parse(stored).id : null;
};