import connectDB from './db';
import express from 'express';
const port = 8888;
import cors from 'cors';
import User from './models/User';
import Note from './models/Note';

connectDB();

const app = express();

app.use(cors()); // to allow UI access the server, since they are on diff ports
app.use(express.json()); // to parse JSON request bodies

// GET notes by userId
app.get('/notes/:userId', async (req, res) => {
  try {
    // use aggregate, a Mongo DB method that transforms or filters the documents step by step.
    const { userId } = req.params;
    const notes = await Note.aggregate([
      { $match: { userId } },
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
    const { id, title, description, created_at } = req.body;

    const newNote = new Note({
      id,
      userId,
      title,
      description,
      created_at,
      updated_at: null,
    });

    const newlySavedNote = await newNote.save();

    if (newlySavedNote) {
      const notes = await Note.aggregate([
        { $match: { userId } },
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
    const { title, description } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { id: noteId },
      { title, description, updated_at: new Date().toISOString() },
      { new: true }
    );

    if (updatedNote) {
      const notes = await Note.aggregate([
        { $match: { userId } },
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
        { $match: { userId } },
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

app.listen(port, () => {
  console.log(`Server is now running in http://localhost:${port}`);
});
