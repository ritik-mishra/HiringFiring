const mongoose = require('mongoose');

const Jobstack = mongoose.model('jobstack');

const requireLogin = require('../middlewares/requireLogin');
const requireAuthor = require('../middlewares/requireAuthor');
const requireFields = require('../middlewares/requireFields');


module.exports = (app) => {
    //add a job in jobstack of a user
    app.post('/api/addto_jobstack/:jobId', requireLogin, async (req, res) => {
        const jb = await Jobstack.find({ "jobId": req.params['jobId'] });
        if (jb.length === 0) {
            const newJob = await new Jobstack({
                googleId: req.user.googleId,
                jobId: req.params['jobId']
            }).save();
            res.send(true);
        }
        else
            res.send(false);
    })
    //to get list of jobId to check in jobboard
    app.get("/api/jobstack_userjobs", requireLogin, async (req, res) => {
        const jobs = await Jobstack.find({ "googleId": req.user.googleId }).distinct("jobId");
        res.send(jobs);
    })
    //to get all jobs in jobstack of a user to show on jobstack page
    app.get("/api/jobstack", requireLogin, async (req, res) => {
        const jobs = await Jobstack.find({ "googleId": req.user.googleId });
        // await Jobstack.remove({});
        res.send(jobs);
    })
}