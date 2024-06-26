const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv =require('dotenv')
dotenv.config();

const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

const registerUser = async (req, res) => {
    try {
        const { name, uid, email, age, gender } = req.body

        const userFields = {
            firebaseUid: uid,
            name,
            email,
            age,
            gender
        };
        const user = await User.create(userFields);

        if (user) {
            res.status(201).json({
                message: "Signed up successfully",
                token: generateToken(user._id)
            })
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: MAIL_USER,
                    pass: MAIL_PASS
                }
            });
            await transporter.sendMail({
                to: user.email,
                from: "CheersAI>",
                subject: "Welcome to CheersAI!",
                text: `Hey ${name}, Thanks for signing up in CheersAI. Start talking to AI-model especially trained for theraapy conversations . Verify your account and start using it.`,
            });
        } else {
            return res.status(200).json({ message: "Failed to create the user" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
}

const checkingIsUserNew = async (req, res) => {
    try {
        const { uid } = req.body;
        const existingUser = await User.findOne({ firebaseUid: uid });
        if (existingUser) {
            // Send specific user fields in the response
            res.status(200).json({
                name: existingUser.name,
                email: existingUser.email,
                age: existingUser.age,
                pic: existingUser.pic,
                token: generateToken(existingUser._id)
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// ------Returning Token while Firebase SignIN----------
const returnToken = async (req, res) => {
    try {
        const { uid } = req.body;
        const user = await User.findOne({ firebaseUid: uid });
        res.status(200).json({
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const checkingCookie = (req, res) => {
    try {
        if (req.user) {
            res.status(200).send({ message: 'User verified' });
        } else {
            res.status(201).send({ message: 'User not verified' });
        }
    } catch (error) {
        console.log("Error while checking Cookie", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const getUserData = async (req, res) => {
    try {
        if (req.user) {
            const userData = req.user;

            res.status(200).send({
                user: userData,
            });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error.' });
    }
};

const updateUserData = async (req, res) => {
    try {
        const { _id } = req.user;
        const { name, age, gender } = req.body;

        const updateObject = {};
        if (name) updateObject.name = name;
        if (age) updateObject.age = age;
        if (gender) updateObject.gender = gender;

        const updatedUser = await User.findByIdAndUpdate(
            _id,
            updateObject,
            { new: true }
        );

        res.status(200).send({
            message: 'User data updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error.' });
    }
};

module.exports = { registerUser, checkingCookie, checkingIsUserNew, returnToken, getUserData, updateUserData };