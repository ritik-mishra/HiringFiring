const mongoose = require('mongoose');

const Job = mongoose.model('jobs');
const { v4: uuidv4 } = require('uuid');

const newId = uuidv4();

exports.addJob = function(company_name,postedby){
    new Job({ jobId: newId, CompanyName: company_name, PostedBy: postedby}).save();
}
