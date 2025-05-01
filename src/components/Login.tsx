import React, { useEffect } from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setSelectedUser } from '../features/userSlice';
import { RootState, store } from '../store';

type AppDispatch = typeof store.dispatch;

const Login = () => {
  const { users, selectedUser, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Fetch users when component mounts
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // check session storage for the seleted user data from the fake login implemented
  useEffect(() => {
    const stored = sessionStorage.getItem('selectedUser');
    if (stored) {
      // if there is selected User we go to NotesPage
      const user = JSON.parse(stored);
      dispatch(setSelectedUser(user));
      navigate(`/notes/${user.id}`);
    }
  }, [dispatch, navigate]);

  const handleLogin = () => {
    const user = users.find((user) => user.id === selectedUser?.id);
    if (user) {
      sessionStorage.setItem('selectedUser', JSON.stringify(user));
      dispatch(setSelectedUser(user));
      navigate(`/notes/${user.id}`);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <div style={{ width: 300, margin: '25% auto', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4">Select a User</Typography>

      <FormControl component="fieldset" style={{ marginTop: '1rem' }}>
        <RadioGroup
          value={selectedUser?.id}
          onChange={(e) =>
            dispatch(setSelectedUser(users.find((user) => user.id === e.target.value) || null))
          }
        >
          {users.map((user) => (
            <FormControlLabel
              key={user.id}
              value={user.id}
              control={<Radio />}
              label={user.username}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleLogin}
        disabled={!selectedUser?.id}
        style={{ marginTop: '1rem' }}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
