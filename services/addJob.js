const mongoose = require('mongoose');

const Job = mongoose.model('jobs');
const { v4: uuidv4 } = require('uuid');

// const newId = uuidv4();
// new Job({ jobId: newId, companyName: 'Google', PostedBy: 'Shreya'}).save();
