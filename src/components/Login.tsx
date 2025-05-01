import React, { useEffect, useState } from 'react';
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

type User = {
  id: string;
  email: string;
  username: string;
};

const Login = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8888/users') // assuming this endpoint returns all users
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // check session storage for the seleted user data from the fake login implemented
    useEffect(() => {
      const stored = sessionStorage.getItem('selectedUser');
      if (stored) {
        // if there is selected User we go to NotesPage
        navigate(`/notes/${JSON.parse(stored).id}`);
      }
    }, [navigate]);
  

  const handleLogin = () => {
    const user = users.find(user => user.id === selectedUserId);
    if (user) {
      sessionStorage.setItem('selectedUser', JSON.stringify(user));
      navigate(`/notes/${user.id}`);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <Typography variant="h4">Select a User</Typography>

      <FormControl component="fieldset" style={{ marginTop: '1rem' }}>
        <RadioGroup
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
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
        disabled={!selectedUserId}
        style={{ marginTop: '1rem' }}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
