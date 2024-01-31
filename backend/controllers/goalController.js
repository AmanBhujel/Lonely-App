const Goal = require("../models/goalsModel");
const ScheduleDay = require("../models/scheduleModel");

const addGoal = async (req, res) => {
    try {
        const { _id } = req.user;
        const { day, description, title, completed,scheduleId ,measureable,relevant, achieveable } = req.body;

        const newGoal = new Goal({
            userId: _id,
            day,
            description,
            title,
            completed,
            scheduleId,
            measureable,
            achieveable,
            relevant
        });

        await newGoal.save();

        res.status(201).json({ message: "Goal added successfully", goal: newGoal });
    } catch (error) {
        console.error("Error adding goal:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getGoal = async (req, res) => {
    try {
        const { _id } = req.user;

        const goals = await Goal.find({ userId: _id });

        res.status(200).json(goals);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const deleteGoal = async (req, res) => {
    try {
        const { _id  } = req.body;

        const deletedGoal = await Goal.findByIdAndDelete(_id);
        await ScheduleDay.findOneAndDelete({ id: deletedGoal.scheduleId, title: deletedGoal.title, description: deletedGoal.description });
        
        res.status(200).json({ message: "Goal deleted successfully." });
    } catch (error) {
        console.error("Error deleting goal:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const updateGoal = async (req, res) => {
    try {
        const { _id, completed } = req.body;

        const updatedGoal = await Goal.findByIdAndUpdate(
            _id,
            { completed }
        );

        res.status(200).json({ message: 'Goal updated successfully', goal: updatedGoal });
    } catch (error) {
        console.error('Error updating goal:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { addGoal, deleteGoal, getGoal, updateGoal }