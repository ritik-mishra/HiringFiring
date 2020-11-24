const mongoose = require('mongoose');

const Job = mongoose.model('jobs');
//const { v4: uuidv4 } = require('uuid'); currently not in use



module.exports = (app)=>{

    app.get('/api/all_jobs', (req, res) =>{
        Job.find({}).exec(function (err, all_jobs) {
            if (err) throw err;
            res.send(all_jobs);
        });

    });
    app.post('/api/add_job', async (req, res) => {
       // const newId = uuidv4(); Not needed for now
        const newJob= await new Job({ 
            jobId: req.body.jobId,
            companyName: req.body.companyName,
            jobTitle: req.body.jobTitle,
            jobLink: req.body.jobLink,
            batch: req.body.batch,
            postedBy: req.body.postedBy
        }).save();
        res.send(newJob);
    })
}
