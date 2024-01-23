const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    totalChats: {
        type: Number,
        default: 0,
    },
    totalCalls: {
        type: Number,
        default: 0,
    },
    totalCosts: {
        type: Number,
        default: 0,
    },
    goalsSet: {
        type: Number,
        default: 0,
    },
    goalsAchieved: {
        type: Number,
        default: 0,
    },
    badges: {
        type: Number,
        default: 0,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;
