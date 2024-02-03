const Goal = require("../models/goalsModel");
const ScheduleDay = require('../models/scheduleModel');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
const uuid = require('uuid');
dotenv.config();

const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

const addGoal = async (req, res) => {
    try {
        const { _id } = req.user;
        const { day, description, title, completed, scheduleId, scheduleDay, additionalMeasures, dayOfWeek } = req.body;
        let scheduleIdArray = [];

        // --------to add schedule days like every sunday----------
        const countDays = async (startDate, endDate) => {
            let count = 0;
            let currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                if (currentDate.getDay() === +dayOfWeek) {
                    const scheduleDay = new ScheduleDay({
                        id: uuid.v4().toString(),
                        title,
                        label: "red",
                        description,
                        day: currentDate.getTime(),
                        userId: _id,
                    });
                    scheduleIdArray.push(scheduleDay.id);
                    await scheduleDay.save();
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: MAIL_USER,
                            pass: MAIL_PASS
                        }
                    });

                    // -----changing day to standard date for scheduling email----------
                    const changedDateToStandardFormat = new Date(day);
                    const dateObject = new Date(changedDateToStandardFormat);
                    dateObject.setDate(dateObject.getDate() - 1);
                    const month = dateObject.getMonth() + 1;
                    const date = dateObject.getDate();

                    cron.schedule(`1 1 1 ${date} ${month} *`, async () => {
                        try {
                            await transporter.sendMail({
                                to: email,
                                subject: 'Schedule Reminder',
                                html: `
                                    <p>Dear User,</p>
                                    <p>Your schedule for tomorrow:</p>
                                    <p>Title: ${title}</p>
                                    <p>Description: ${description}</p>
                                    <p>Hope you have a productive day!</p>
                                `,
                            });
                        } catch (err) {
                            console.error(err);
                        }
                    }); count++;
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return count;
        };

        const today = new Date();
        const endDate = new Date(day);
        const count = await countDays(today, endDate);



        const changedDateToStandardFormat = new Date(day);
        const newGoal = new Goal({
            userId: _id,
            day,
            description,
            title,
            completed,
            scheduleId,
            scheduleDay,
            additionalMeasures,
            scheduleIdArray
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
        const { _id } = req.body;

        const deletedGoal = await Goal.findByIdAndDelete(_id);
        await ScheduleDay.findOneAndDelete({ id: deletedGoal.scheduleId, title: deletedGoal.title, description: deletedGoal.description });
        await deletedGoal.scheduleIdArray.map(async (id) => {
            await ScheduleDay.findOneAndDelete({ id: id, title: deletedGoal.title, description: deletedGoal.description });
        })

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