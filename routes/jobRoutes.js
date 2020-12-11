const mongoose = require('mongoose');

const Job = mongoose.model('jobs');
const { v4: uuidv4 } = require('uuid');

const requireLogin = require('../middlewares/requireLogin');
const requireAuthor = require('../middlewares/requireAuthor');

const keys = require('../config/keys');

module.exports = (app) => {

    //Get job by page number
    app.get('/api/page_job', requireLogin, async (req, res) => {
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
    app.get('/api/count_job', requireLogin, async (req, res) => {
        const jobcount = await Job.countDocuments();
        var jobc = '' + jobcount
        res.send(jobc);
    })

    //  Delete Job
    app.delete('/api/delete_job/:jobId', requireLogin, requireAuthor, async (req, res) => {
    
        const jobId = req.params['jobId'];
        const del = await Job.deleteOne({ jobId: jobId }, (err) => {
            if (err)
                throw err;
        });
        res.send(del);
    })

    //  Add Job
    app.post('/api/add_job', requireLogin, async (req, res) => {
        if(!req.body.companyName || !req.body.jobTitle || !req.body.jobLink || !req.body.batch){
            return res.status(400).send("Mandatory field(s) missing/Input values not coherent with rules");
        }
        const newId = uuidv4();
        var dt = Date.now() + (90 * 24 * 60 * 60 * 1000);
        dt = new Date(dt);
        if (req.body.jobExpiry)
            dt = req.body.jobExpiry;
        const newJob = await new Job({
            jobId: newId,
            companyName: req.body.companyName,
            jobTitle: req.body.jobTitle,
            jobLink: req.body.jobLink,
            batch: req.body.batch,
            isReferral: req.body.isReferral,
            jobExpiry: dt,
            postedBy: req.user.name,
            postedById: req.user.id
        }).save();
        res.send(newJob);
    });

    //update jobs
    app.put('/api/update/:jobId', requireLogin, requireAuthor, async (req, res) => {
        try {
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