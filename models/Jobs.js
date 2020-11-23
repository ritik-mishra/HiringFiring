const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    companyName: String,
    jobTitle: String,
    JobLink: String,
    batch: String
})

mongoose.model('jobs', jobSchema);
