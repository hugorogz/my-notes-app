import { notesEndpoint, getUserId } from "../utils";

export const GetNotesByUserId = async (setNotes, setIsLoading) => {
    try {
        const userId = getUserId();
        // hardcoded fetching for UserA for now, to simulate fetching of UserA Notes
        const response = await fetch(`${notesEndpoint}${userId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch notes')
        }

        const data = await response.json();

        setNotes(data);
    } catch (err) {
        console.error(`Error fetching the Notes: ${err}`)
    } finally {
        setIsLoading(false);
    }
}

export const createNote = async (newNote, setNotes) => {
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
      setNotes(updatedNotes);
    } catch (err) {
      console.error(`Error creating note: ${err}`);
    }
  };
  

export const updateNote = async (noteId, updatedData) => {
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
    
        const data = await response.json();

        return data;
    } catch(err) {
        console.error(`Error Updating this Note`);
    }
};

export const deleteNote = async (noteId, setNotes) => {
    const userId = getUserId();
    try {
      const response = await fetch(`${notesEndpoint}${userId}/${noteId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
  
      const updatedNotes = await response.json();
      setNotes(updatedNotes);
    } catch (err) {
      console.error(`Error deleting note: ${err}`);
    }
};