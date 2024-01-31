const ScheduleDay = require('../models/scheduleModel');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config();

const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

const addSchedule = async (req, res) => {
    try {
        const { _id, email } = req.user;
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
                console.log('sending email from cron job')
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
        });

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

const deleteSchedule = async (req, res) => {
    try {
        const { id } = req.body;
        await ScheduleDay.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Deleted Successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addSchedule, getSchedule, deleteSchedule };