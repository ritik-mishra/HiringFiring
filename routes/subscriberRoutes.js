const mongoose = require('mongoose');
const Subscriber = mongoose.model('subscribers');

// const { v4: uuidv4 } = require('uuid');
const requireLogin = require('../middlewares/requireLogin');
const requireAuthor = require('../middlewares/requireAuthor');
const requireFields = require('../middlewares/requireFields');

// const keys = require('../config/keys');

module.exports = (app) => {
    app.post('/api/add_subscriber', requireLogin, async (req, res) => {

        try {
            // const newId = uuidv4();
            const newSub = await new Subscriber({
                userId: req.user.id,
                email: req.user.email,
                batch: req.body.batch,
                role: req.body.role
            }).save();
            res.send(true);
            console.log("Subscriber Added")
            console.log(newSub);    
        }
        catch (err) {
            res.send(err);
            console.log(err);
        }
    });
}