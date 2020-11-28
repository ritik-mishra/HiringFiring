const mongoose = require('mongoose');

const Job = mongoose.model('jobs');
const { v4: uuidv4 } = require('uuid'); 



module.exports = (app)=>{
    
    
//  Get Job
    app.get('/api/all_jobs', (req, res) =>{
        
        Job.find({}).exec(function (err, all_jobs) {
            if (err) throw err;
            res.send(all_jobs);
        });

    });
    
    
//  Delete Job
    app.get('/api/delete_job', (req, res) => {
        const jobId = req.query.jobId;
        Job.deleteOne({ jobId: jobId }, (err) => {
            if (err)
                throw err;
            console.log("job deleted");
        });
    })
    
    
    
//  Add Job
    app.post('/api/add_job', async (req, res) => {
        const newId = uuidv4(); 
        const newJob= await new Job({ 
            jobId: newId,
            companyName: req.body.companyName,
            jobTitle: req.body.jobTitle,
            jobLink: req.body.jobLink,
            batch: req.body.batch,
            postedBy: req.body.postedBy
        }).save((err) => {
            if(err)
                throw err;
        });
        res.send(newJob);
    })
}