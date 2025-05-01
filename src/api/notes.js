import { notesEndpoint, userAId } from "../utils";

export const GetNotesByUserId = async (setNotes, setIsLoading) => {
    try {
        // hardcoded fetching for UserA for now, to simulate fetching of UserA Notes
        const response = await fetch(`${notesEndpoint}${userAId}`);

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
    try {
      const response = await fetch(`${notesEndpoint}${userAId}`, {
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
    try {
        const response = await fetch(`${notesEndpoint}${userAId}/${noteId}`, {
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
    try {
      const response = await fetch(`${notesEndpoint}${userAId}/${noteId}`, {
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