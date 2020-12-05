const passport = require('passport');
const url = require('../config/url');

module.exports = (app)=>{
    app.get('/auth/google',
        passport.authenticate('google',{
            scope: ['profile','email']
        })
    );

    app.get('/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
        res.redirect(url.baseURL + '/dashboard');
    }
    );

    app.get('/api/logout', (req, res) =>{
        req.logout();
        res.redirect(url.baseURL + '/');
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
}