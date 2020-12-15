const mongoose = require('mongoose');

const Job = mongoose.model('jobs');
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
    app.get('/api/company_list', requireLogin, async (req, res) => {
        var list = await Job.find().distinct('companyName');
        res.send(list);
    })
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
    //Add liker
    app.post('/api/add_liker', requireLogin, requireFields,async (req, res) => {
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
    app.post('/api/add_job', requireLogin, requireFields, async (req, res) => {

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
            postedById: req.user.id,
            role: req.body.role
        }).save();
        res.send(true);
    });

    //update jobs
    app.patch('/api/update/:jobId', requireLogin, requireAuthor, requireFields, async (req,res)=>{
        try{
            const updatedJob=await Job.updateOne({jobId:req.params.jobId},
            {$set: {
                companyName:req.body.companyName,
                role:req.body.role,
                jobTitle:req.body.jobTitle,
                jobLink:req.body.jobLink,
                batch:req.body.batch,
                isReferral:req.body.isReferral,
                jobExpiry:req.body.jobExpiry},
                });
                res.send("Job updated");
            
        }
        catch(err){
          res.send(err); 
        }
    });
}