var cron = require('node-cron');
const mongoose = require('mongoose');
const Reminder = mongoose.model('reminder');
const mailKeys = require('../config/mailKeys');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


//used https://alexb72.medium.com/how-to-send-emails-using-a-nodemailer-gmail-and-oauth2-fe19d66451f9
//this article for configuration
var Cron = function Cron() {
    function getMailHTML(body) {
        var mail =
            '<div>\
        <p>Hi '+ body.userName + ',<p>\
        <p>Greetings from Jofi</p>\
        <p>This is to remind you about the following job:<p>\
        <p>Company Name: '+ body.companyName + '</p>\
        <p>Role: '+ body.role[0] + '</p>\
        <p>Job Link: '+ body.jobLink + '</p>\
        <p><b>Your message: </b>' + body.message + '</p>\
        <p>For more, visit:<a target="_blank" href="http://pomodoro-nowornever.centralindia.cloudapp.azure.com/hiring-firing">Hiring Firing</a> </p>\
        <p>Thank you</p>\
        <p>Jofi</p>\
        <br/><br/>\
        <p>(do not reply to this mail)</P>\
        </div>';
        return mail;
    }
    //Function to send reminder mail to one instance
    function sendmail(body, transport) {
        var ht = getMailHTML(body);
        const mailOptions = {
            from: 'jofi.hiringfiring@gmail.com', // sender
            to: body.userEmail, // receiver
            subject: 'Reminder for Job from ' + body.companyName, // Subject
            html: ht// html body
        };
        transport.sendMail(mailOptions, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                transport.close();
            }
        })
    }
    //Cron function that will be called
    async function utilFun() {
        //current relative time in milliseconds
        var d = Date.now() + 55 * 6 * 60 * 1000;
        var md = 20 * 60 * 1000;
        d = d - (d % md);

        //getting access token
        const myOAuth2Client = new OAuth2(
            mailKeys.googleClientID,
            mailKeys.googleClientSecret,
            "https://developers.google.com/oauthplayground"
        );
        myOAuth2Client.setCredentials({
            refresh_token: mailKeys.refreshToken
        });
        const myAccessToken = myOAuth2Client.getAccessToken();
        //creating mail transporter
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "jofi.hiringfiring@gmail.com", //your gmail account you used to set the project up in google cloud console"
                clientId: mailKeys.googleClientID,
                clientSecret: mailKeys.googleClientSecret,
                refreshToken: mailKeys.refreshToken,
                accessToken: myAccessToken //access token variable we defined earlier
            }
        });
        //Testing
        // var body = {
        //     role: ['Intern'],
        //     userName: 'Sonu Verma',
        //     googleId: '5fc5b79f73d8c9736ae0e800',
        //     userEmail: 'vermasonu6416@gmail.com',
        //     companyName: 'Facebook',
        //     jobLink: 'https://www.mygate.com',
        //     message: 'Set reminder for Job',
        //     time: 1609689600000,
        //     __v: 0
        // };
        // sendmail(body, transport);


        var arr = await Reminder.find({ time: d });
        Reminder.deleteMany({ time: d });
        for (let i = 0; i < arr.length; i++) {
            sendmail(arr[i], transport);
        }
    }


    //Setting the Cron job
    cron.schedule('0 0 * * * *', () => {
        utilFun();
    },
        {
            scheduled: true,
            timezone: "Asia/Kolkata"
        }
    );
}
module.exports.Cron = Cron;