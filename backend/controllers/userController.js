const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, uid, email, age, gender } = req.body
        console.log(uid, name, email, age, gender, "uid")

        const userFields = {
            firebaseUid: uid,
            name,
            email,
            age,
            gender
        };
        console.log(userFields, 'userfields')
        const user = await User.create(userFields);

        if (user) {
            console.log(user, 'user')
            res.status(201).json({
                message: "Signed up successfully",
                token: generateToken(user._id)
            })
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
        console.log(existingUser)
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
        console.log(user, "user form return token")
        res.status(200).json({
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const checkingCookie = (req, res) => {
    console.log(req.user)
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
        console.log('updateuserdata is runnign')
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
        console.log('from here')
        res.status(500).send({ message: 'Internal Server Error.' });
    }
};

module.exports = { registerUser, checkingCookie, checkingIsUserNew, returnToken, getUserData, updateUserData };