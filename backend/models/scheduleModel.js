const mongoose = require('mongoose');

const scheduleDaySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    day: {
        type: Number,
        required: true
    }

});

const ScheduleDay = mongoose.model('ScheduleDay', scheduleDaySchema);

module.exports = ScheduleDay;
