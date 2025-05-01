import { notesEndpoint, getUserId } from "../utils";

export const GetNotesByUserId = async () => {
    try {
        const userId = getUserId();
        const response = await fetch(`${notesEndpoint}${userId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch notes')
        }

        const notes = await response.json();
        return notes;
    } catch (err) {
        console.error(`Error fetching the Notes: ${err}`)
    }
}

export const createNoteAPI = async (newNote) => {
    const userId = getUserId();
    try {
      const response = await fetch(`${notesEndpoint}${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create note');
      }
  
      const updatedNotes = await response.json();
      return updatedNotes;
    } catch (err) {
      console.error(`Error creating note: ${err}`);
    }
  };
  

export const updateNoteAPI = async (noteId, updatedData) => {
    const userId = getUserId();
    try {
        const response = await fetch(`${notesEndpoint}${userId}/${noteId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });
    
        if (!response.ok) {
            throw new Error('Failed to update this Note')
        }
    
        const updatedNotes = await response.json();
        return updatedNotes;
    } catch(err) {
        console.error(`Error Updating this Note`);
    }
};

export const deleteNoteAPI = async (noteId) => {
    const userId = getUserId();
    try {
      const response = await fetch(`${notesEndpoint}${userId}/${noteId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
  
      const updatedNotes = await response.json();
      return updatedNotes;
    } catch (err) {
      console.error(`Error deleting note: ${err}`);
    }
};