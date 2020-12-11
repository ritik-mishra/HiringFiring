const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    jobId: String,
    companyName: String,
    jobTitle: String,
    jobLink: String,
    batch: Map,
    isReferral: String,
    jobExpiry: { type: Date },
    postedOn: { type: Date, default: Date.now },
    postedBy: String,
    postedById: String,
    jobDesciption: String

});

mongoose.model('jobs', jobSchema);
