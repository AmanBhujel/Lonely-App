const Feedback = require('../models/feedbackModel');

const storeFeedback = async (req, res) => {
    try {
        const { feedback, expression } = req.body;

        const newFeedback = await Feedback.create({
            feedback,
            expression,
        });
    } catch (error) {
        console.error('Error saving feedback:', error);
    }
};

module.exports = { storeFeedback };
