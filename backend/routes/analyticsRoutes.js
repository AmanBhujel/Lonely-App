const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getAnalytics, updateAnalyticsCalls } = require('../controllers/analyticsController');

const router = express.Router();

router.get('/get-analytics', protect, getAnalytics);
router.get('/update-calls', protect, updateAnalyticsCalls);

module.exports = router;
