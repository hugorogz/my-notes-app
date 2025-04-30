import React from 'react';
import { 
    Button, 
    TextField, 
} from '@mui/material';
import ReactQuill from 'react-quill-new';
import styles from '../styles/NotesForm.module.scss'

type NoteFormProps = {
    title: string;
    description: string;
    onTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onSave: () => void;
    editNoteId: string | null;
}

const NoteForm = ({
    title,
    description,
    onTitleChange,
    onDescriptionChange,
    onSave,
    editNoteId
}: NoteFormProps) => {
    return <div id="notes-form" className={styles.formContainer}>
        <TextField 
            label="Title"
            value={title}
            margin="normal"
            onChange={(event) => onTitleChange(event.target.value)}
            />
            {/* Text area with rich text capabilities, it produces text html tags */}
            <div className={styles.editor}>
            <ReactQuill
                theme="snow"
                value={description}
                onChange={onDescriptionChange}
            />
            </div>

            <Button variant="contained" color="primary" onClick={onSave}>
            {editNoteId ? "Save Edited Note" : "Add Note"}
            </Button>
    </div>;
};

export default NoteForm;