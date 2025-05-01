import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../utils';

interface NotesState {
  notes: Note[];
  loading: boolean;
}

const initialState: NotesState = {
  notes: [],
  loading: false,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setNotes, setLoading } = notesSlice.actions;

export default notesSlice.reducer;
