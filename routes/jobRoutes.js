const mongoose = require('mongoose');

const Job = mongoose.model('jobs');
const { v4: uuidv4 } = require('uuid');

const requireLogin = require('../middlewares/requireLogin');
const requireAuthor = require('../middlewares/requireAuthor');

const keys = require('../config/keys');

module.exports = (app) => {

    //Get Job
    app.get('/api/all_jobs', requireLogin, (req, res) => {
        Job.find({}).exec(function (err, all_jobs) {
            if (err) throw err;
            res.send(all_jobs);
        });

    });


    //  Delete Job
    app.get('/api/delete_job/:jobId', requireLogin, requireAuthor, (req, res) => {
        console.log(process.env.NODE_ENV);
        const jobId = req.params['jobId'];
        Job.deleteOne({ jobId: jobId }, (err) => {
            if (err)
                throw err;
            console.log("job deleted");
        });
        return res.redirect(keys.baseURL + "/dashboard");
    })



    //  Add Job
    app.post('/api/add_job', requireLogin, async (req, res) => {
        const newId = uuidv4();
        const newJob = await new Job({
            jobId: newId,
            companyName: req.body.companyName,
            jobTitle: req.body.jobTitle,
            jobLink: req.body.jobLink,
            batch: req.body.batch,
            isReferral: req.body.isReferral,
            jobExpiry: req.body.jobExpiry,
            postedBy: req.user.name,
            postedById: req.user.id
        }).save();

        res.send(newJob);
    });
}