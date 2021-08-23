var cron = require('node-cron');
const mongoose = require('mongoose');
const Subscriber = mongoose.model('subscribers');
const Job = mongoose.model('jobs');
const mailKeys = require('../config/mailKeys');
const nodemailer = require('nodemailer');


const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: "jofi.hiringfiring@gmail.com", //your gmail account you used to set the project up in google cloud console"
        clientId: mailKeys.googleClientID,
        clientSecret: mailKeys.googleClientSecret,
        refreshToken: mailKeys.refreshToken,
    }
});


//used https://alexb72.medium.com/how-to-send-emails-using-a-nodemailer-gmail-and-oauth2-fe19d66451f9
//this article for configuration
var Cron = function Cron() {
    
    function getData(body) {
        var text = "";
        for (i=0; i<body.length; i++) {
            text+= body[i].companyName + "<br>";
        }
        return text;
    }
    function getMailHTML(body) {
        var mail =
            '<div>\
        <p>Hey There,<p>\
        <p>Greetings from Jofi !</p>\
        <p>This is to remind you about the action you need to take for the following job:<p>\
        <p>To get into action for these openings, visit:<a target="_blank" href="https://nowornever.live/hiring-firing/jobboard">Hiring Firing</a> </p>\
        <p>Until next time :)</p>\
        <p>Jofi</p>\
        <br/><br/>\
        <p><i>Do not reply to this mail</i></P>\
        </div>';
        return mail;
    }
    //Function to send reminder mail to one instance
    async function sendmail(body, jobs) {
        var ht = getMailHTML(jobs);
        const mailOptions = {
            from: 'jofi.hiringfiring@gmail.com', // sender
            to: body.email, // receiver
            subject: 'Hiring Firing summary (since your last visit) ', // Subject
            html: ht// html body
        };
        transport.sendMail(mailOptions, async function (err, result) {
            if (err) {

                // const upd = await Reminder.findByIdAndUpdate(body._id, { nTries: body.nTries + 1 });
                console.log(err);
            }
            else {
                // const upd = await Reminder.findByIdAndUpdate(body._id, { isSent: true });
                transport.close();
            }
        })
    }
    //Cron function that will be called
    async function utilFun() {

        try { 
            var arr = await Subscriber.find();
            var all_jobs = await Job.find();
            // var arr = await Reminder.find({ time: { $lte: d }, isSent: false, nTries: { $lte: 3 } });
            for (let i = 0; i < arr.length; i++) {
                var curr_jobs = all_jobs.filter(function (el) {
                    el.batch == arr[i].batch &&
                    el.role == arr[i].role;
                }
                );
                sendmail(arr[i], curr_jobs);
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    //Setting the Cron job

    cron.schedule('30 8 * * *', () => {
        utilFun();
    },
        {
            scheduled: true,
            timezone: "Asia/Kolkata"
        }
    );
}
module.exports.Cron = Cron;