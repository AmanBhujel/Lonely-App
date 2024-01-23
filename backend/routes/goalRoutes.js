const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addGoal, getGoal, deleteGoal ,updateGoal} = require('../controllers/goalController');

const router = express.Router();

router.post('/add-goal', protect, addGoal);
router.get('/get-goal', protect, getGoal);
router.post('/delete-goal',protect, deleteGoal);
router.post('/update-goal',protect, updateGoal);

module.exports = router;
