const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriberSchema = new Schema({
    userId: String,
    email: String,
    batch: String,
    isSent: { type: Boolean, default: false },
    role: Array
});
mongoose.model('subscribers', subscriberSchema);