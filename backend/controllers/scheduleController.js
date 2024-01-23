const ScheduleDay = require('../models/scheduleModel');

const addSchedule = async (req, res) => {
    try {
        const { _id } = req.user;
        const { title, day, description, id, label } = req.body;

        const scheduleDay = new ScheduleDay({
            id,
            title,
            label,
            description,
            day,
            userId: _id,
        });

        await scheduleDay.save();

        res.status(201).json({ success: true, scheduleDay });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getSchedule = async (req, res) => {
    try {
        const { _id } = req.user;

        // Find schedule days for the user
        const scheduleDays = await ScheduleDay.find({ userId: _id });

        res.status(200).json({ success: true, scheduleDays });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteSchedule = async(req,res)=>{
    try{
        const {id}=req.body;
        await ScheduleDay.findByIdAndDelete(id);
        res.status(200).json({ success: true,message: "Deleted Successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addSchedule, getSchedule, deleteSchedule };