const mongoose = require('mongoose');
const { stringify } = require('uuid');
const { Schema } = mongoose;

const reminderSchema = new Schema({
    userName: String,
    googleId: String,
    userEmail: String,
    companyName: String,
    jobLink: String,
    role: Array,
    message: String,
    time: Number
});
mongoose.model('reminder', reminderSchema);