import React, { useEffect, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Note } from './utils';
import NotesGrid from './components/NotesGrid';
import 'react-quill-new/dist/quill.snow.css';
import NoteForm from './components/NoteForm';
import { createNote, deleteNote, GetNotesByUserId, updateNote } from './api/notes';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from './components/ResponsiveAppBar';

function NotesPage() {
  // states for notes, as well as title, description and the editing  note id to identify an existing note
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {// fetch fake notes to populate, by calling a /notes endpoint in Node server
    setIsLoading(true)
    GetNotesByUserId(setNotes, setIsLoading); // get notes from /notes/:userid endpoint
  }, [])

  // check session storage for the seleted user data from the fake login implemented
  useEffect(() => {
    const stored = sessionStorage.getItem('selectedUser');
    if (!stored) {
      // if no selected User we go to loginPage
      navigate('/');
    }
  }, [navigate]);

  // function to save changes in both new and existing notes
  const handleSave = async () => {
    if (editNoteId) { // if there's an id, is a existing note
      const newUpdates = await updateNote(editNoteId, { title, description });

      setNotes(newUpdates);

      // once existing note is saved, reset the id
      setEditNoteId(null);
    } else {// if not existing then is a new note
      const newlyCreatedNote: Note = {
        id: uuidv4(), // use uuid library to create unique ids, pretty wide-used in industry
        title,
        description,
        created_at: new Date().toISOString(),
        updated_at: null,
      }

      await createNote(newlyCreatedNote, setNotes);
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
    deleteNote(id, setNotes);
  };

  return (
    <div>
      {/* from MUI library */}
      <ResponsiveAppBar /> 
      
      <h1 style={{ textAlign: 'center' }}>
        {editNoteId ? 'Edit Note' : 'Create a Note'}
      </h1>

      <NoteForm 
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onSave={handleSave}
        editNoteId={editNoteId}
        setEditNoteId={setEditNoteId}
      />

      {isLoading ? <CircularProgress /> :  <NotesGrid 
        notes={notes} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete} 
        editNoteId={editNoteId}
        setEditNoteId={setEditNoteId}
      />}

    </div>
  );
}

export default NotesPage;
