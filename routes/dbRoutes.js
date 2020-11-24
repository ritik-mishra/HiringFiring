const addJob = require('../services/addJob');


module.exports = (app) => {
    app.post('/api/add_job', (req, res) => {
        addJob.addJob(req.body.CompanyName, req.body.PostedBy);
        res.send("working");
    })
    app.get('/api/add_job', (req, res) => {
        res.send("I am working");
    })
};