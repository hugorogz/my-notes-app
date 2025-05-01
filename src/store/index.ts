import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import notesReducer from '../features/notesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
