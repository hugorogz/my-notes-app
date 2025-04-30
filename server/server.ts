const express = require('express');
const port = 8888;
const cors = require('cors');
const { testNotes } = require('./serverUtils');

const app = express();

app.use(cors());// to allow UI access the server, since they are on diff ports

app.get('/notes', (req, res) => {
    res.send(testNotes)// send hardcoded notes to test population by hiting this endpoint
})

app.listen(port, () => {
    console.log(`Server is now running in http://localhost:${port}`)
})