import { v4 as uuidv4 } from 'uuid';
import { MongoClient } from 'mongodb';

// Connection to mongo DB
const url = 'mongodb://localhost:27017';
const dbName = 'my-notes-app';
const client = new MongoClient(url);

const users = [
  {
    id: uuidv4(),
    username: 'UserA',
    email: 'usera@example.com',
  },
  {
    id: uuidv4(),
    username: 'UserB',
    email: 'userb@example.com',
  }
];

const testNotes = [
  {
    id: uuidv4(),
    title: "Lorem Ipsum Dolor",
    description: "<p><strong>Lorem</strong> ipsum dolor sit amet, <em>consectetur</em> adipiscing elit.</p>",
    created_at: "2025-04-28T22:26:41.236Z",
    updated_at: null,
    userId: users[0].id, // Associate note with UserA
    userAccess: [`${users[1].id}`] // We include UserB in userAccess, this means that is a note shared fro UserA to UserB
  },
  {
    id: uuidv4(),
    title: "Sed Do Eiusmod",
    description: "<p>Sed do eiusmod <u>tempor incididunt</u> ut labore et dolore magna aliqua.</p>",
    created_at: "2025-04-28T21:15:30.236Z",
    updated_at: null,
    userId: users[0].id, // Associate note with UserA
    userAccess: [`${users[1].id}`] // We include UserB in userAccess, this means that is a note shared fro UserA to UserB
  },
  {
    id: uuidv4(),
    title: "Ut Enim Ad Minim",
    description: "<p>Ut enim ad <strong>minim veniam</strong>, quis nostrud exercitation ullamco.</p>",
    created_at: "2025-04-28T20:03:15.236Z",
    updated_at: null,
    userId: users[0].id, // Associate note with UserA
    userAccess: [] // This is NOT a shared note
  },
  {
    id: uuidv4(),
    title: "Laboris Nisi Ut",
    description: "<p>Laboris nisi ut aliquip <span style='color: blue;'>ex ea commodo</span> consequat.</p>",
    created_at: "2025-04-28T18:48:22.236Z",
    updated_at: null,
    userId: users[0].id, // Associate note with UserA
    userAccess: [] // This is NOT a shared note
  },
  {
    id: uuidv4(),
    title: "Duis Aute Irure",
    description: "<p>Duis aute irure dolor in <em>reprehenderit</em> in voluptate velit esse cillum.</p>",
    created_at: "2025-04-28T17:37:11.236Z",
    updated_at: null,
    userId: users[0].id, // Associate note with UserA
    userAccess: [] // This is NOT a shared note
  },
  {
    id: uuidv4(),
    title: "Fugiat Nulla Pariatur",
    description: "<p>Fugiat nulla pariatur. Excepteur <u>sint occaecat</u> cupidatat non proident.</p>",
    created_at: "2025-04-28T16:24:05.236Z",
    updated_at: null,
    userId: users[0].id, // Associate note with UserA
    userAccess: [] // This is NOT a shared note
  },
  {
    id: uuidv4(),
    title: "Sunt In Culpa",
    description: "<p>Sunt in culpa qui officia <strong>deserunt mollit</strong> anim id est laborum.</p>",
    created_at: "2025-04-28T15:10:50.236Z",
    updated_at: null,
    userId: users[0].id, // Associate note with UserA
    userAccess: [] // This is NOT a shared note 
  },
  {
    id: uuidv4(),
    title: "Curabitur Non Nulla",
    description: "<p>Curabitur non nulla sit amet <em>nisl tempus</em> convallis quis ac lectus.</p>",
    created_at: "2025-04-28T14:02:31.236Z",
    updated_at: null,
    userId: users[0].id, // Associate note with UserA
    userAccess: [] // Esta es una nota NO compartida
  },
  {
    id: uuidv4(),
    title: "Vivamus Magna",
    description: "<p>Vivamus magna justo, lacinia eget <span style='color: green;'>consectetur sed</span>, convallis at tellus.</p>",
    created_at: "2025-04-28T12:48:19.236Z",
    updated_at: null,
    userId: users[0].id, /// Associate note with UserA
    userAccess: [] // This is NOT a shared note
  },
  {
    id: uuidv4(),
    title: "Donec Rutrum",
    description: "<p>Donec rutrum congue leo eget <strong>malesuada</strong>.</p>",
    created_at: "2025-04-28T11:32:44.236Z",
    updated_at: null,
    userId: users[0].id, // Associate note with UserA
    userAccess: [] // This is NOT a shared note
  },
  {
    id: uuidv4(),
    title: "Nota 1 de UserB",
    description: "<p>Descripción de la nota de <strong>UserB</strong></p>",
    created_at: "2025-04-28T09:00:00.000Z",
    updated_at: null,
    userId: users[1].id, // Associate note with UserB
    userAccess: [] // This is NOT a shared note
  },
  {
    id: uuidv4(),
    title: "Nota 2 de UserB",
    description: "<p>Otra nota de <strong>UserB</strong></p>",
    created_at: "2025-04-28T08:15:00.000Z",
    updated_at: null,
    userId: users[1].id, // Associate note with UserB
    userAccess: [] // This is NOT a shared note
  },
  {
    id: uuidv4(),
    title: "Nota 3 de UserB",
    description: "<p>Descripción final de la nota de <strong>UserB</strong></p>",
    created_at: "2025-04-28T07:45:00.000Z",
    updated_at: null,
    userId: users[1].id, // Associate note with UserB
    userAccess: [] // This is NOT a shared note
  }
];

async function insertUsersAndNotes() {
  try {
    await client.connect();
    console.log('Conectado a MongoDB');

    const db = client.db(dbName);

    // Insert users
    const usersCollection = db.collection('users');
    await usersCollection.insertMany(users);

    // Insert notes associated with each user
    const notesCollection = db.collection('notes');
    await notesCollection.insertMany(testNotes);

    console.log('Users and notes successfully inserted!');
  } catch (error) {
    console.error('Error when tying to insert users and notes:', error);
  } finally {
    await client.close();
  }
}

insertUsersAndNotes();
