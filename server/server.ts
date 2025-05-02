const connectDB = require('./db');
const express = require('express');
const port = 8888;
const cors = require('cors');
const http = require('http');
const User = require('./models/User');
const Note = require('./models/Note');
const { Server } = require('socket.io');

connectDB();

const app = express();

app.use(cors()); // to allow UI access the server, since they are on diff ports
app.use(express.json()); // to parse JSON request bodies
const server = http.createServer(app);
const noteRooms = {};

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// GET notes by userId
app.get('/notes/:userId', async (req, res) => {
  try {
    // use aggregate, a Mongo DB method that transforms or filters the documents step by step.
    const { userId } = req.params;
    const notes = await Note.aggregate([
      {
          $match: {
          $or: [
            { userId },
            { userAccess: { $in: [userId] } }, // shared with user
          ],
        }
      },
      {
        $addFields: {
          sortTime: {
            $toDate: {
              // toDate converts string ISO to real date for sorting purposes
              $ifNull: ['$updated_at', '$created_at'], // if there is a NON-null updated_at use it, if not fallback to created_at
            },
          },
        },
      },
      { $sort: { sortTime: -1 } }, // sorts from recently created to oldest
    ]);

    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send('ServerError');
  }
});

// POST to create notes
app.post('/notes/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { id, title, description, created_at, userAccess } = req.body;

    const newNote = new Note({
      id,
      userId,
      title,
      description,
      created_at,
      updated_at: null,
      userAccess
    });

    const newlySavedNote = await newNote.save();

    if (newlySavedNote) {
      const notes = await Note.aggregate([
        { 
          $match: {
            $or: [
              { userId },
              { userAccess: { $in: [userId] } },
            ],
          },
        },
        {
          $addFields: {
            sortTime: {
              $toDate: {
                $ifNull: ['$updated_at', '$created_at'],
              },
            },
          },
        },
        { $sort: { sortTime: -1 } },
      ]);

      res.json(notes);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('ServerError');
  }
});

// PUT to Edit a user's notes
app.put('/notes/:userId/:noteId', async (req, res) => {
  try {
    const { userId, noteId } = req.params;
    const { title, description, userAccess } = req.body;
    const newShared = userAccess.length ? userAccess : []

    const updatedNote = await Note.findOneAndUpdate(
      { id: noteId },
      { title, description, updated_at: new Date().toISOString(), userAccess: newShared },
      { new: true }
    );

    if (updatedNote) {
      const notes = await Note.aggregate([
        { 
          $match: {
            $or: [
              { userId },
              { userAccess: { $in: [userId] } },
            ],
          },
        },
        {
          $addFields: {
            sortTime: {
              $toDate: {
                $ifNull: ['$updated_at', '$created_at'],
              },
            },
          },
        },
        { $sort: { sortTime: -1 } },
      ]);
      res.json(notes);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('ServerError');
  }
});

// DELETE a user's note
app.delete('/notes/:userId/:noteId', async (req, res) => {
  try {
    const { userId, noteId } = req.params;

    const deletedNote = await Note.findOneAndDelete({ id: noteId });

    if (deletedNote) {
      // After deleting, return remaining notes, sorted with the logic we described above
      const notes = await Note.aggregate([
        { 
          $match: {
            $or: [
              { userId },
              { userAccess: { $in: [userId] } },
            ],
          },
        },
        {
          $addFields: {
            sortTime: {
              $toDate: {
                $ifNull: ['$updated_at', '$created_at'],
              },
            },
          },
        },
        { $sort: { sortTime: -1 } },
      ]);

      res.json(notes);
    } else {
      res.status(404).send('Note not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('ServerError');
  }
});

// Endpoint to get users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('ServerError');
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-note', (noteId) => {
    socket.join(noteId);
    console.log(`Socket ${socket.id} joined note ${noteId}`);
  });

  socket.on('edit-note', async ({ noteId, updatedNote }) => {
    await Note.updateOne({ id: noteId }, updatedNote);
    socket.to(noteId).emit('note-updated', updatedNote);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Socket.IO server running on port 3001');
});

app.listen(port, () => {
  console.log(`Server is now running in http://localhost:${port}`);
});
