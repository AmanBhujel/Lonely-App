const mongoose = require('mongoose');
const User = require('./userModel');

// Schema for ChatMessage
const chatMessageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
    fromUser: { type: Boolean, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

// Schema for AudioMessage
const AudioMessageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
    fromUser: { type: Boolean, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const AudioMessage = mongoose.model('AudioMessage', AudioMessageSchema);

// Schema for Summary
const summarySchema = new mongoose.Schema({
    userID: { type: String, required: true },
    summaryContent: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Summary = mongoose.model('Summary', summarySchema);

module.exports = {
    ChatMessage,
    AudioMessage,
    Summary,
};
