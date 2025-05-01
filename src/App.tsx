import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import NotesPage from './NotesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/notes/:userId" element={<NotesPage />} />
    </Routes>
  );
}

export default App;
