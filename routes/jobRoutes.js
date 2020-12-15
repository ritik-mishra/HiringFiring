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
    app.get('/api/company_list', requireLogin, async (req, res) => {
        var list = await Job.find().distinct('companyName');
        res.send(list);
    })
    //Get job by page number
    app.get('/api/page_job', requireLogin, async (req, res) => {
        const page = parseInt(req.query.page);
        const PAGE_SIZE = 5;//change this accordingly
        const skip = (page - 1) * PAGE_SIZE;
        const body_batch = req.query.batch;
        const body_companyName = req.query.companies;
        const body_role = req.query.role;
        const sortBy = req.query.sortBy;
        
        var page_jobs = await Job.find({  "$and":[  {"batch": { "$in": body_batch }}, {"companyName": {"$in": body_companyName }},
            {"role": {"$in": body_role }}]})
            .sort({[req.query.sortBy]: req.query.comparator})
            .skip(skip)
            .limit(PAGE_SIZE);
        res.send(page_jobs);
    })
    //Add liker
    app.post('/api/add_liker', requireLogin, async (req, res) => {
        const user = req.body.user;
        const jobId = req.body.jobId;
        var job = await Job.findOne({ jobId: jobId });
        var isPresent = job.likers.includes(user);
        if (!isPresent) {
            job.likers.push(user);
            job.likersCount += 1;
        }
        await job.save();
        res.send("true");
    })
    //remove liker
    app.post('/api/remove_liker', requireLogin, async (req, res) => {
        const user = req.body.user;
        const jobId = req.body.jobId;
        var job = await Job.findOne({ jobId: jobId });
        var isPresent = job.likers.includes(user);
        if (isPresent) {
            const index = job.likers.indexOf(user);
            job.likers.splice(index, 1);
            job.likersCount -= 1;
        }
        await job.save();
        res.send("true");
    })
    //count jobs
    app.get('/api/count_job', requireLogin, async (req, res) => {
        const body_batch = req.query.batch;
        const body_companyName = req.query.companies;
        const body_role = req.query.role;
        
        var job = await Job.find( { "$and":[  {"batch": { "$in": body_batch }}, {"companyName": {"$in": body_companyName }},
            {"role": {"$in": body_role }}]} );
        const jobcount = job.length;
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
        if (!req.body.companyName || !req.body.role || !req.body.jobLink || !req.body.batch) {
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
            postedById: req.user.id,
            role: req.body.role
        }).save();
        res.send(true);
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
        res.send(true);
    });

}