const passport = require('passport');
const url = require('../config/url');

module.exports = (app)=>{
    app.get(url.baseURL +'/auth/google',
        passport.authenticate('google',{
            scope: ['profile','email']
        })
    );

    app.get(url.baseURL + '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
        res.redirect(url.baseURL + '/dashboard');
    }
    );

    app.get(url.baseURL + '/api/logout', (req, res) =>{
        req.logout();
        res.redirect(url.baseURL + '/');
    })

    app.get(url.baseURL + '/api/current_user', (req, res) => {
        res.send(req.user);
    })
}