const express = require('express');
const { storingTextMessage, getTextMessages } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/chat',protect,storingTextMessage);
router.get('/get-chat',protect,getTextMessages)

module.exports = router;
