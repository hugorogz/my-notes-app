import React, { useEffect, useState } from 'react';
import './App.css';

import { v4 as uuidv4 } from 'uuid';
import { Note } from './utils';
import NotesGrid from './components/NotesGrid';
import 'react-quill-new/dist/quill.snow.css';
import NoteForm from './components/NoteForm';
import { fetchNotes } from './api/notes';

function App() {
  // states for notes, as well as title, description and the editing  note id to identify an existing note
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editNoteId, setEditNoteId] = useState<string | null>(null);

  useEffect(() => {// fetch fake notes to populate, by calling a /notes endpoint in Node server
    fetchNotes(setNotes);
  }, [])

  // function to save changes in both new and existing notes
  const handleSave = () => {
    if (editNoteId) { // if there's an id, is a existing note
      setNotes((prev) => {
        return prev.map((note) => note.id === editNoteId ? { ...note, title, description } : note)
      });
      // once existing note is saved, reset the id
      setEditNoteId(null);
    } else {// if not existing then is a new note
      const newlyCreatedNote: Note = {
        id: uuidv4(), // use uuid library to create unique ids, pretty wide-used in industry
        title,
        description
      }

      setNotes((prev) => [...prev, newlyCreatedNote])
    }

    // reset form, potential improvement by using some form observer or html reset 
    setTitle("");
    setDescription("")
  };

  // funtion to enable edition of ax existing note
  const handleEdit = (note: Note) => {// since is existing al data should be set in current State
    setEditNoteId(note.id);
    setTitle(note.title);
    setDescription(note.description);
  };

  // function to delete
  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        My notes app
      </h1>

      <NoteForm 
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onSave={handleSave}
        editNoteId={editNoteId}
      />

      <NotesGrid 
        notes={notes} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete} 
        editNoteId={editNoteId}
      />

    </div>
  );
}

export default App;
