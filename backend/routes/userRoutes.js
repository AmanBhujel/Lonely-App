const express = require('express');
const { registerUser, checkingCookie, checkingIsUserNew, returnToken, getUserData, updateUserData } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.get('/check-cookie', protect, checkingCookie);
router.post('/fireuid', registerUser);
router.post('/checkFireuid', checkingIsUserNew);
router.post('/get-token', returnToken);
router.get('/get-user-data', protect, getUserData);
router.post('/update-user', protect, updateUserData);

module.exports = router;
