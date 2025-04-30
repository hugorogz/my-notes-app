import React, { useEffect, useState } from 'react';
import './App.css';
import { 
  Button, 
  TextField, 
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Note } from './utils';
import NotesGrid from './components/NotesGrid';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import styles from './styles/NotesForm.module.scss'
import { testNotes } from './utils';


function App() {
  // states for notes, as well as title, description and the editing  note id to identify an existing note
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editNoteId, setEditNoteId] = useState<string | null>(null);

  useEffect(() => {
    setNotes(testNotes); // to simulate we are importing and setting some notes already created
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

      <div id="notes-form" className={styles.formContainer}>
        <TextField 
          label="Title"
          value={title}
          margin="normal"
          onChange={(event) => setTitle(event.target.value)}
        />
        {/* Text area with rich text capabilities, it produces text html tags */}
        <div className={styles.editor}>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
          />
        </div>

        <Button variant="contained" color="primary" onClick={handleSave}>
          {editNoteId ? "Save Edited Note" : "Add Note"}
        </Button>
      </div>

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
