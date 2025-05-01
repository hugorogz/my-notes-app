import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../utils';

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const res = await fetch('http://localhost:8888/users');
  return await res.json();
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [] as User[],
    selectedUser: null as User | null,
    loading: false,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      sessionStorage.setItem('selectedUser', JSON.stringify(action.payload));
    },
    restoreUserFromSession: (state) => {
      const stored = sessionStorage.getItem('selectedUser');
      if (stored) {
        state.selectedUser = JSON.parse(stored);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedUser, restoreUserFromSession } = userSlice.actions;
export default userSlice.reducer;
