const mongoose = require('mongoose');

const Jobstack = mongoose.model('jobstack');

const requireLogin = require('../middlewares/requireLogin');
const requireAuthor = require('../middlewares/requireAuthor');
const requireFields = require('../middlewares/requireFields');


module.exports = (app) => {
    //add a job in jobstack of a user
    app.post('/api/addto_jobstack/:jobId', requireLogin, async (req, res) => {
        const jb = await Jobstack.find({ "jobId": req.params['jobId'], "googleId": req.user.googleId });
        if (jb.length === 0) {
            const newJob = await new Jobstack({
                googleId: req.user.googleId,
                jobId: req.params['jobId'],
                jobExpiry: req.body.jobExpiry,
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
        const jobs = await Jobstack.find({ "googleId": req.user.googleId 
            }).sort({ [req.query.sortBy]: req.query.comparator });
        // await Jobstack.remove({});
        res.send(jobs);
    })

    //edit job in my jobStack
    app.patch("/api/update_jobstack/:jobId",requireLogin, async (req, res) => {
        try {
            const updatedJob = await Jobstack.updateOne({ "jobId": req.params['jobId'], "googleId": req.user.googleId },
                {
                    $set: {
                        status: req.body.status,
                        followUp: req.body.followUp,
                        comment: req.body.comment
                    },
                });
            res.send("Job updated");

        }
        catch (err) {
            res.send(err);
        }
    });
    app.delete("/api/delete_jobstack/:jobId",requireLogin, async (req, res) => {
        try {
            await Jobstack.deleteOne({ "jobId": req.params['jobId'], "googleId": req.user.googleId });
            res.send("Job deleted");

        }
        catch (err) {
            res.send(err);
        }
    });
}