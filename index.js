const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./models/Jobs');
require('./services/passport');
require('dotenv').config();

mongoose.connect(keys.mongoURI);
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.use(express.json());

require('./routes/jobRoutes')(app);
console.log(process.env);
if(process.env.NODE_ENV === 'production'){
    //Serve Production assets, main.js and main.css
    app.use(express.static('client/build'));

    //serve index.html file
    const path = require('path');
    app.get('*',(req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
const Port = process.env || 5000;

app.listen(5000);
