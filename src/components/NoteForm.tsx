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
    setEditNoteId: (value: string | null) => void;
}

const NoteForm = ({
    title,
    description,
    onTitleChange,
    onDescriptionChange,
    onSave,
    editNoteId,
    setEditNoteId,
}: NoteFormProps) => {
    const isDescriptionEmpty = description.trim() === '' || description === '<p><br></p>';

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

            <div>
                <Button 
                    variant="contained"
                    color="primary" 
                    onClick={onSave}
                    disabled={!title.trim() && isDescriptionEmpty}
                >
                    {editNoteId ? "Save Edited Note" : "Add Note"}
                </Button>
                {editNoteId && <Button 
                    variant="outlined" 
                    onClick={() => {
                        setEditNoteId(null);
                        onTitleChange("");
                        onDescriptionChange("");
                    }}
                >
                    Cancel
                </Button>}
            </div>
    </div>;
};

export default NoteForm;