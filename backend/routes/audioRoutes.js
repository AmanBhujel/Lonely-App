const express = require('express');
const { storingAudioMessage } = require('../controllers/audioTextController');
const { protect } = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/save-audio', protect, storingAudioMessage);

module.exports = router;
