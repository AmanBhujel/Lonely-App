const express = require('express');
const { storeFeedback } = require('../controllers/feedbackController');
const router = express.Router();

router.post('/feedback', storeFeedback);

module.exports = router;