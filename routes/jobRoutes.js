const mongoose = require('mongoose');

const Job = mongoose.model('jobs');

module.exports = (app)=>{

    app.get('/api/all_jobs', (req, res) =>{
        Job.find({}).exec(function (err, all_jobs) {
            if (err) throw err;
            res.send(all_jobs);
        });

    })
}
