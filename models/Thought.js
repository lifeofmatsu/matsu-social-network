const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  // Define schema fields
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
