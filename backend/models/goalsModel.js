const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  scheduleDay: {
    type: String,
  },
  additionalMeasures: {
    type: String,
  },
  scheduleIdArray: {
    type: [String],
    default: [],
  },
  day: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  scheduleId: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
