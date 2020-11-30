const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(emailValue){ if(!validator.isEmail(emailValue)) throw new Error("Email is invalid") }
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }] 
});


// Virtual 
userSchema.virtual('project', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'ownerId'
});

// Hide values (password..)
userSchema.methods.toJSON = function() {
    let user = this.toObject();
    delete user.password;
    return user;
}

// Find User
userSchema.statics.findUser = async(email,password) => {

    const user = await User.findOne({ email }); // {email : email}
    if(!user) throw "Email is not registered.";

    const isCorrect = await bcryptjs.compareSync(password, user.password);
    if(!isCorrect) throw "Password not correct.";

    return user;
}
// Generate Auth Token
userSchema.methods.generateAuthToken = async function() {

    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, '.!##&@*#&*');

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}

// Hash Password
userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')) user.password = await bcryptjs.hash(user.password, 8);
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User; 