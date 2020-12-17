const mongoose = require('mongoose');

const Jobstack = mongoose.model('jobstack');

const requireLogin = require('../middlewares/requireLogin');
const requireAuthor = require('../middlewares/requireAuthor');
const requireFields = require('../middlewares/requireFields');


module.exports = (app) => {
    app.post("/api/addto_jobstack", requireLogin, async (req, res) => {
        const newJob = await new Jobstack({
            googleId: req.user.googleId,
            jobId: req.body.jobId
        }).save();
        res.send(true);
    })
}