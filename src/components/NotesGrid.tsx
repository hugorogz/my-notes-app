import React, { useState } from 'react';
import { Note } from '../utils';
import { 
  Button, 
  Grid, 
  Card, 
  CardActions, 
  CardContent, 
  Typography, 
  CardHeader
} from '@mui/material';
import styles from '../styles/NotesGrid.module.scss';
import DeleteNoteConfirm from './DeleteNoteConfirm';

type NotesGridProps = {
    notes: Note[];
    handleEdit: Function;
    handleDelete: Function;
    editNoteId: string | null;
    setEditNoteId: (value: string | null) => void
}

// React memo for the component only re-render when props change.
const NotesGrid = React.memo(({ 
    notes, 
    handleEdit,
    handleDelete, 
    editNoteId,
    setEditNoteId, 
}: NotesGridProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return <div 
        id="notes-container" 
        className={styles.notesContainer}
    >
        <Grid container spacing={2}>  
            {notes.map((note) => (
                <Grid key={note.id} size={4}>
                    <Card
                        className={styles.noteCard}
                        style={editNoteId === note.id ? { border: '1px solid blue' } : {}}
                    >
                        <CardContent className={styles.noteContent}>
                            <CardHeader
                                title={note.title}
                                subheader={note.updated_at 
                                    ? new Date(note.updated_at).toLocaleString()
                                    : new Date(note.created_at).toLocaleString()}
                            />
                            <Typography 
                                component="div" 
                                dangerouslySetInnerHTML={{ __html: note.description }} 
                                className={styles.description}
                            />
                        </CardContent>
                        <CardActions>
                            <Button 
                                size="small" 
                                onClick={() => handleEdit(note)}
                                style={editNoteId ? { color: 'grey' } : {}}
                                disabled={Boolean(editNoteId)}
                            >
                                Edit
                            </Button>
                            <Button 
                                size="small" 
                                onClick={() => {
                                    setEditNoteId(note.id)
                                    setIsOpen(true)
                                }} 
                                style={{ color: `${editNoteId ? 'grey' : 'red'}` }}
                                disabled={Boolean(editNoteId)}
                            >
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>

        <DeleteNoteConfirm
            isOpen={isOpen}
            handleCancel={() => {
                setEditNoteId(null);
                setIsOpen(false);
            }}
            handleDelete={() => {
                handleDelete(editNoteId);
                setEditNoteId(null);
                setIsOpen(false);
            }}
        />
    </div>;
});

export default NotesGrid;