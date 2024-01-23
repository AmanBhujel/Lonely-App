const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    firebaseUid: { type: String, require: true, unique: true },
    email: { type: String, required: true },
    age: { type: String },
    gender: { type: String },
    pic: {
        type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
