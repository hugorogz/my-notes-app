import React, { useEffect, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Note } from './utils';
import NotesGrid from './components/NotesGrid';
import 'react-quill-new/dist/quill.snow.css';
import NoteForm from './components/NoteForm';
import { createNoteAPI, deleteNoteAPI, GetNotesByUserId, updateNoteAPI } from './api/notes';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from './store';
import { setNotes, setLoading } from './features/notesSlice';
import { fetchUsers } from './features/userSlice';
import { socket } from './socket';

type AppDispatch = typeof store.dispatch;

function NotesPage() {
  // states for notes, as well as title, description and the editing  note id to identify an existing note
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userAccess, setUserAccess] = useState<(string | null)[]>([]);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [sharedWithUserId, setSharedWithUserId] = useState<string | null>(null);
  const { notes, loading } = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // check session storage for the seleted user data from the fake login implemented
  useEffect(() => {
    const stored = sessionStorage.getItem('selectedUser');
    if (!stored) {
      // if no selected User we go to loginPage
      navigate('/');
    } else {
      // fetch fake notes to populate, by calling a /notes endpoint in Node server
      dispatch(setLoading(true));
     

      const intervalId = setInterval(() => {
        GetNotesByUserId()
          .then((fetchedNotes) => dispatch(setNotes(fetchedNotes)))
          .finally(() => dispatch(setLoading(false)));
      }, 5000);
  
      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (editNoteId) {
      socket.emit('join-note', editNoteId);
  
      socket.on('note-updated', (incomingNote) => {
        if (incomingNote.id === editNoteId) {
          console.log('incomingNote', incomingNote)
          handleEdit(incomingNote)
        }
      });
    
      return () => {
        socket.off('note-updated');
      };
    }
   
  }, [editNoteId]);

  // function to save changes in both new and existing notes
  const handleSave = async () => {
    if (editNoteId) {
      // if there's an id, is a existing note
      const updatedNote = {
        title,
        description,
        userAccess: sharedWithUserId ? [sharedWithUserId] : []
      };

      const updatedNotes = await updateNoteAPI(editNoteId, updatedNote); // API call to update note
      dispatch(setNotes(updatedNotes));
      socket.emit('edit-note', { noteId: editNoteId, updatedNote });
      setEditNoteId(null); // Reset edit note ID
    } else {
      // if not existing then is a new note
      const newlyCreatedNote: Note = {
        id: uuidv4(), // use uuid library to create unique ids, pretty wide-used in industry
        title,
        description,
        created_at: new Date().toISOString(),
        updated_at: null,
        userAccess: sharedWithUserId ? [sharedWithUserId] : []
      };

      const updatedNotes = await createNoteAPI(newlyCreatedNote);
      dispatch(setNotes(updatedNotes));
    }

    // reset form, potential improvement by using some form observer or html reset
    setTitle('');
    setDescription('');
    setUserAccess([]);
    setEditNoteId(null);
    setSharedWithUserId(null);
  };

  // funtion to enable edition of ax existing note
  const handleEdit = (note: Note) => {
    // since is existing al data should be set in current State
    setEditNoteId(note.id);
    setTitle(note.title);
    setDescription(note.description);
    setUserAccess(note.userAccess)
    setSharedWithUserId(note.userAccess[0] || null);
  };

  // function to delete
  const handleDelete = async (editNoteId: string | null) => {
    const updatedNotes = await deleteNoteAPI(editNoteId);
    dispatch(setNotes(updatedNotes));
  };

  return (
    <div>
      {/* from MUI library */}
      <ResponsiveAppBar />

      <h1 style={{ textAlign: 'center' }}>{editNoteId ? 'Edit Note' : 'Create a Note'}</h1>

      <NoteForm
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onSave={handleSave}
        editNoteId={editNoteId}
        setEditNoteId={setEditNoteId}
        sharedWithUserId={sharedWithUserId}
        setSharedWithUserId={setSharedWithUserId}
        userAccess={userAccess}
        setUserAccess={setUserAccess}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <NotesGrid
          notes={notes}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          editNoteId={editNoteId}
          setEditNoteId={setEditNoteId}
        />
      )}
    </div>
  );
}

export default NotesPage;
