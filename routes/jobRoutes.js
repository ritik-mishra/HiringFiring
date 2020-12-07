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

    //Get job by page number
    app.get('/api/page_job', async (req, res) => {
        const page = parseInt(req.query.page);
        const PAGE_SIZE = 5;//change this accordingly
        const skip = (page - 1) * PAGE_SIZE;
        var page_jobs = await Job.find({})
            .sort({ postedOn: -1 })
            .skip(skip)
            .limit(PAGE_SIZE);
        res.send(page_jobs);
    })

    //count jobs
    app.get('/api/count_job', async (req, res) => {
        const jobcount = await Job.countDocuments();
        var jobc = '' + jobcount
        res.send(jobc);
    })

    //  Delete Job
    app.get('/api/delete_job/:jobId', requireLogin, requireAuthor, async (req, res) => {
    
        const jobId = req.params['jobId'];
        const del = await Job.deleteOne({ jobId: jobId }, (err) => {
            if (err)
                throw err;
        });
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

    //update jobs
    app.put('/api/update/:jobId', async (req, res) => {
        try {
            console.log("Entering Update API");
            let job = await Job.findOneAndUpdate({ jobId: req.params.jobId }, req.body, {
                new: true,
                runValidators: true,
            });
            res.status(200).send(job);
        } catch (err) {
            console.error(err);
        }
    });
}