import React from 'react';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import ReactQuill from 'react-quill-new';
import styles from '../styles/NotesForm.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type User = {
  id: string;
  username: string;
};

type NoteFormProps = {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSave: () => void;
  editNoteId: string | null;
  setEditNoteId: (value: string | null) => void;
  sharedWithUserId: string | null;
  setSharedWithUserId: (value: string | null) => void;
  userAccess: (string | null)[];
  setUserAccess: (value: (string | null)[]) => void; //Dispatch<SetStateAction<(string | null)[]>>
};

const NoteForm = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSave,
  editNoteId,
  setEditNoteId,
  sharedWithUserId,
  setSharedWithUserId,
  userAccess,
  setUserAccess
}: NoteFormProps) => {
  const isDescriptionEmpty =
    description.trim() === '' || description === '<p><br></p>';
  const users = useSelector((state: RootState) => state.user.users);
  const currentUserId = JSON.parse(sessionStorage.getItem('selectedUser') || "");
  const shareableUsers = users.filter((user: User) => user.id !== currentUserId.id);

  return (
    <div id="notes-form" className={styles.formContainer}>
      <TextField
        label="Title"
        value={title}
        margin="normal"
        onChange={(event) => onTitleChange(event.target.value)}
      />

      <div className={styles.editor}>
        <ReactQuill theme="snow" value={description} onChange={onDescriptionChange} />
      </div>

      <FormControl fullWidth margin="normal">
        <InputLabel id="share-user-label">Share with</InputLabel>
        <Select
          labelId="share-user-label"
          value={sharedWithUserId || users.find(user => user.id === userAccess[0])?.id || ''}
          onChange={(event) => setSharedWithUserId(event.target.value || null)}
          displayEmpty
        >
          {shareableUsers.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={onSave}
          disabled={!title.trim() && isDescriptionEmpty}
        >
          {editNoteId ? 'Save Edited Note' : 'Add Note'}
        </Button>
        {editNoteId && (
          <Button
            variant="outlined"
            onClick={() => {
              setEditNoteId(null);
              onTitleChange('');
              onDescriptionChange('');
              setSharedWithUserId(null);
              setUserAccess([]);
            }}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default NoteForm;
