const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide Username"],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: [true, "Email must me unique"],
        required: [true, "Please provide Email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please provide a valid email"]
    },
    password: {
        type: String,
        minlength: 4,
        required: [true, "Please provide password"]
    }
});

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createToken = function (){
    return jwt.sign({userId: this._id, username: this.username}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

UserSchema.methods.validatePassword = async function(userPassword){
    return bcrypt.compare(userPassword, this.password); 
}

module.exports = mongoose.model("User", UserSchema);