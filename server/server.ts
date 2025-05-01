const connectDB = require('./db');
const express = require('express');
const port = 8888;
const cors = require('cors');
const { testNotes } = require('./serverUtils');
const User = require('./models/User'); 
const Note = require('./models/Note');

connectDB();

const app = express();

app.use(cors());// to allow UI access the server, since they are on diff ports
app.use(express.json()); // to parse JSON request bodies

app.get('/notes/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const notes = await Note.find({ userId }).sort({ created_at: -1 })

        res.json(notes);
    } catch(err) {
        console.error(err);
        res.status(500).send('ServerError')
    }
})

app.listen(port, () => {
    console.log(`Server is now running in http://localhost:${port}`)
})