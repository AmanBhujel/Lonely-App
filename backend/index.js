const express = require('express');
const connectDB = require('./config/dbConfig');
const colors = require('colors');
const app = express();
const cors = require('cors')
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const audioRoutes = require('./routes/audioRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const goalRoutes = require('./routes/goalRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
app.use(express.json());
app.use(cors());
app.use('/', userRoutes, chatRoutes, feedbackRoutes, audioRoutes, scheduleRoutes, goalRoutes, analyticsRoutes);

connectDB();


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

app.get('/', (req, res) => {
    res.json("I AM HERE");
});
