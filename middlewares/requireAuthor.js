const mongoose = require('mongoose');

const Job = mongoose.model('jobs');


module.exports =  async (req, res, next) => {
    const job = await Job.findOne({
        jobId: req.params.jobId,
    }).lean();

    if(job.postedById != req.user.id){
        return res.status(401).send({error: "You must have authored the post to perform the requested action"});
    }
    
    next();
    
};