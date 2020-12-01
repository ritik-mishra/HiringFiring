const mongoose = require('mongoose');

const Job = mongoose.model('jobs');
const { v4: uuidv4 } = require('uuid'); 

const requireLogin = require('../middlewares/requireLogin');
const requireAuthor = require('../middlewares/requireAuthor');


module.exports = (app)=>{
    
    
//  Get Job
    app.get('/api/all_jobs', requireLogin, (req, res) =>{
        
        Job.find({}).exec(function (err, all_jobs) {
            if (err) throw err;
            res.send(all_jobs);
        });

    });
    
    
//  Delete Job
    app.get('/api/delete_job', requireLogin, (req, res) => {
        const jobId = req.query.jobId;
        Job.deleteOne({ jobId: jobId }, (err) => {
            if (err)
                throw err;
            console.log("job deleted");
        });
    })
    
    
    
//  Add Job
    app.post('/api/add_job', requireLogin, async (req, res) => {
        const newId = uuidv4(); 
        const newJob= await new Job({ 
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
    })

    app.get('/api/edit/:jobId', [requireLogin, requireAuthor], async (req, res) => {
        try {
          const job = await Job.findOne({
            _id: req.params.jobId,
          }).lean();
  
            res.send(job);
        } catch (err) {
          console.error(err);
          return ;
        }
      });
  
      // @desc    Update job
      //    PUT/job/:id
      app.put('/api/:id', [requireLogin, requireAuthor], async (req, res) => { 
        try {
             let job = await Job.findOneAndUpdate({ _id: req.params.id }, req.body, {
              new: true,
              runValidators: true,
            });
            res.status(200).send(job);
            return ;
        } catch (err) {
          console.error(err);
  
          return ;
        }
      });
}