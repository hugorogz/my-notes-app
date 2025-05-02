const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const noteSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  userId: { type: String },
  title: String,  
  description: String,
  created_at: String,
  updated_at: { type: String, default: null },
  userAccess: [{ type: String }]
});

module.exports = mongoose.model('Note', noteSchema);
