const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    jobId: String,
    companyName: String,
    jobTitle: String,
    jobLink: String,
    batch: String,
    postedOn: { type: Date, default: Date.now },
    postedBy: String
});

mongoose.model('jobs', jobSchema);
