const mongoose = require('mongoose');

const Job = mongoose.model('jobs');
<<<<<<< HEAD

=======
const Comment = mongoose.model('comments');
>>>>>>> main
const { v4: uuidv4 } = require('uuid');

const requireLogin = require('../middlewares/requireLogin');
const requireAuthor = require('../middlewares/requireAuthor');
const requireFields = require('../middlewares/requireFields');

const keys = require('../config/keys');

module.exports = (app) => {
    //Get Job
    app.get('/api/all_jobs', requireLogin, (req, res) => {
        Job.find({}).exec(function (err, all_jobs) {
            if (err) throw err;
            res.send(all_jobs);
        });
    });
    //get single Job by,to be used in jobstack
    app.get('/api/jobidjob/:jobId', requireLogin, async (req, res) => {
        const job = await Job.findOne({ "jobId": req.params['jobId'] });
        res.send(job);
    });
    //company list to be used to populate in dropdown
    app.get('/api/company_list', requireLogin, async (req, res) => {
        var list = await Job.find().distinct('companyName');
        res.send(list);
    });
    //Get job by page number
    app.get('/api/page_job', requireLogin, async (req, res) => {
        const page = parseInt(req.query.page);
        const PAGE_SIZE = 5;//change this accordingly
        const skip = (page - 1) * PAGE_SIZE;
        const body_batch = req.query.batch;
        const body_companyName = req.query.companies;
        const body_role = req.query.role;
        const sortBy = req.query.sortBy;

        var job = await Job.find({
            "$and": [{ "batch": { "$in": body_batch } }, { isDeleted: false }, { "companyName": { "$in": body_companyName } },
            { "role": { "$in": body_role } }]
        });
        const jobcount = job.length;
        var jobc = '' + jobcount

        var page_jobs = await Job.find({
            "$and": [{ "batch": { "$in": body_batch } }, { isDeleted: false }, { "companyName": { "$in": body_companyName } },
            { "role": { "$in": body_role } }]
        })
            
        // var page_jobs = job
            .sort({ [req.query.sortBy]: req.query.comparator })
<<<<<<< HEAD
            .skip(skip)
            .limit(PAGE_SIZE);

        res.send(page_jobs);
    })
    //Add liker
    app.post('/api/add_liker', requireLogin, async (req, res) => {
        const user = req.user.googleId;
        console.log(user);
=======
            .skip(skip) 
            .limit(PAGE_SIZE)
            .populate('previewComment');
        
        var arr = {
            page: page_jobs, 
            count: jobc
        }
        res.send(arr);
    })
    //Add liker
    app.post('/api/add_liker', requireLogin, async (req, res) => {
        const user = req.user.googleId
>>>>>>> main
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
        const user = req.user.googleId;
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
    // app.get('/api/count_job', requireLogin, async (req, res) => {
    //     const body_batch = req.query.batch;
    //     const body_companyName = req.query.companies;
    //     const body_role = req.query.role;

    //     var job = await Job.find({
    //         "$and": [{ "batch": { "$in": body_batch } }, { isDeleted: false }, { "companyName": { "$in": body_companyName } },
    //         { "role": { "$in": body_role } }]
    //     });
    //     const jobcount = job.length;
    //     var jobc = '' + jobcount

    //     res.send(jobc);
    // })

    //  Delete Job
    app.patch('/api/delete_job/:jobId', requireLogin, requireAuthor, async (req, res) => {
        const jobId = req.params['jobId'];
        const job = await Job.findOne({ jobId: jobId }, (err) => {
            if (err)
                throw err;
        });
        job.isDeleted = true;
        job.save();
        res.send(true);
    })

    //  Add Job 
    app.post('/api/add_job', requireLogin, requireFields, async (req, res) => {

        const newId = uuidv4();
        console.log(req.user);

        const newJob = await new Job({
            jobId: newId,
            companyName: req.body.companyName,
            jobTitle: req.body.jobTitle,
            jobLink: req.body.jobLink,
            batch: req.body.batch,
            isReferral: req.body.isReferral,
            jobExpiry: req.body.jobExpiry,
            postedBy: req.user.name,
            postedById: req.user.id,
            role: req.body.role
        }).save();
        res.send(true);
    });

    //update jobs
    app.patch('/api/update/:jobId', requireLogin, requireAuthor, requireFields, async (req, res) => {
        try {
            const updatedJob = await Job.updateOne({ jobId: req.params.jobId },
                {
                    $set: {
                        companyName: req.body.companyName,
                        role: req.body.role,
                        jobTitle: req.body.jobTitle,
                        jobLink: req.body.jobLink,
                        batch: req.body.batch,
                        isReferral: req.body.isReferral,
                        jobExpiry: req.body.jobExpiry
                    },
                });
            res.send("Job updated");

        }
        catch (err) {
            res.send(err);
        }
    });

}