const mongoose = require('mongoose');

const Reminder = mongoose.model('reminder');
const requireLogin = require('../middlewares/requireLogin');
const requireAuthor = require('../middlewares/requireAuthor');
const requireFields = require('../middlewares/requireFields');
module.exports = (app) => {
    app.post('/api/add_reminder', requireLogin, async (req, res) => {
        const newReminder = await new Reminder({
            userName: req.user.name,
            googleId: req.user.id,
            userEmail: req.user.email,
            companyName: req.body.companyName,
            jobLink: req.body.jobLink,
            role: req.body.role,
            message: req.body.message,
            time: req.body.time,
            isSent: 0,
            nTries: 0
        }).save();
        res.send(true);
    });
}