const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(emailValue){ if(!validator.isEmail(emailValue)) throw new Error("Email is invalid") }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7
    },

    name: String,
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

const User = mongoose.model("User", userSchema);

module.exports = User;