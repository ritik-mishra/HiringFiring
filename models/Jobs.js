const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    jobId: String,
    companyName: String,
    jobTitle: String,
    jobLink: String,
    batch: String,
    postedOn: { type: Date, default: Date.now },
    postedBy: String,
    isReferral: String,
    jobExpiry: { type: Date },
    jobDesciption: String

});

mongoose.model('jobs', jobSchema);
