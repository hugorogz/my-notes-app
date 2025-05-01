import React from 'react';
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

type NotesGridProps = {
    notes: Note[];
    handleEdit: Function;
    handleDelete: Function;
    editNoteId: string | null;
}

// React memo for the component only re-render when props change.
const NotesGrid = React.memo(({ notes, handleEdit, handleDelete, editNoteId }: NotesGridProps) => {
    return <div 
            id="notes-container" 
            className={styles.notesContainer}
        >
        <Grid container spacing={2}>  
        {notes.map((note) => (
            <Grid key={note.id} size={4}>
                <Card
                    className={styles.noteCard}
                >
                    <CardContent className={styles.noteContent}>
                        {/* <Typography variant="h6">
                            {note.title}
                        </Typography> */}
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
                            style={editNoteId === note.id ? { color: 'grey' } : {}}
                            disabled={editNoteId === note.id}
                        >
                            Edit
                        </Button>
                        <Button 
                            size="small" 
                            onClick={() => handleDelete(note.id)} 
                            style={{ color: `${editNoteId === note.id ? 'grey' : 'red'}` }}
                            disabled={editNoteId === note.id}
                        >
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        ))}
        </Grid>
    </div>;
});

export default NotesGrid;