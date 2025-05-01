
export interface Note {
  id: string;
  title: string;
  description: string;
  created_at: string;
};

export const notesEndpoint = 'http://localhost:8888/notes/';

export const userAId = '46972baa-a8e3-46e2-8b38-17a8aeb92a56';
export const userBId = '5301b9c3-3068-4740-8dd7-428ea698f18f';