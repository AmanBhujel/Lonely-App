const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addSchedule, getSchedule, deleteSchedule } = require('../controllers/scheduleController');

const router = express.Router();

router.post('/add-schedule', protect, addSchedule);
router.get('/get-schedule', protect, getSchedule);
router.post('/delete-schedule',protect, deleteSchedule)

module.exports = router;
