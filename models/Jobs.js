const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    jobId: String,
    companyName: String,
    jobTitle: String,
    JobLink: String,
    batch: String,
    PostedOn: { type: Date, default: Date.now },
    PostedBy: String
});

mongoose.model('jobs', jobSchema);
