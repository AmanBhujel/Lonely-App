const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
  },
  expression: {
    type: String,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
