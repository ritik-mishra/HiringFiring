// const mongoose = require('mongoose');
// const Subscriber = mongoose.model('subscribers');
// const Job = mongoose.model('jobs');
// const mailKeys = require('../config/mailKeys');
// const nodemailer = require('nodemailer');
// // const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;


// //Function to send reminder mail to one instance
// module.exports = (app) => {
//     function getMailHTML(body) {
//         var mail =
//             `<div>
//         <p>Hey There,<p>
//         <p>Greetings from Jofi !</p>
//         <p>This is to remind you about the action you need to take for the following job:<p>
//         <p>To get into action for these openings, visit:<a target="_blank" href="https://nowornever.live/hiring-firing/jobboard">Hiring Firing</a> </p>
//         <p>Until next time :)</p>
//         <p>Jofi</p>
//         <br/><br/>
//         <p><i>Do not reply to this mail</i></p>
//         </div>`;
//         return mail;
//     }

//     function sendmail(body, transport) {
//         var ht = getMailHTML();
//         const mailOptions = {
//             from: 'jofi.hiringfiring@gmail.com', // sender
//             to: body.email, // receiver
//             subject: 'Testing mail', // Subject
//             html: ht // html body
//         };
//         transport.sendMail(mailOptions, function (err, result) {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 console.log('Email Sent!!');
//             }
//         })
//     }

//     app.post('/sendemail',async function(req,res) {
//         console.log('Post ran');
//         //getting access token
//         const myOAuth2Client = new OAuth2(
//             mailKeys.googleClientID,
//             mailKeys.googleClientSecret,
//             "https://developers.google.com/oauthplayground"
//         );
//         myOAuth2Client.setCredentials({
//             refresh_token: mailKeys.refreshToken
//         });
//         const myAccessToken = await myOAuth2Client.getAccessToken();
//         //creating mail transporter
//         const transport = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 type: "OAuth2",
//                 user: "jofi.hiringfiring@gmail.com", //your gmail account you used to set the project up in google cloud console"
//                 clientId: mailKeys.googleClientID,
//                 clientSecret: mailKeys.googleClientSecret,
//                 refreshToken: mailKeys.refreshToken,
//                 accessToken: myAccessToken //access token variable we defined earlier
//             }
//         });
        
//         // var body = await Users.find({});
//         // // console.log(body);
//         // for (let i = 0; i < body.length; i++) {
//         //     console.log(body[i].email);
//         //     sendmail(body[i], transport)
//         // }
//         sendmail(req.body, transport)
//     })
// }

const mongoose = require('mongoose');
const Users = mongoose.model('users');
const mailKeys = require('../config/mailKeys');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


//Function to send reminder mail to one instance


module.exports = (app) => {
    function getMailHTML() {
        var mail =
            '<div>\
        <p>Hello There! Greetings from Jofi (your Job Finder)<p>\
        <p>Hope you are doing great!</p>\
        <p>Thanks for using Hiring Firing. Since you have stepped up your game in job-hunting, we too are excited to have you on-board and have some awesome news for you. Hiring-Firing has been updated with some fun and useful upgrades:<p>\
        <p><b>1. Jobstack:</b> This will be a dedicated space for every user where he/she can add a job from the jobboard page. Post this, there are some cool operations you can perform which will make your job-hunting task much more manageable. </p>\
        <p> &ensp; <b>a. Status:</b> You can monitor your status for a particular job, i.e. - Applied/Asked for a referal/Shortlisted for interview/etc and keep track of all your progress from one place</p>\
        <p> &ensp; <b>b. Reminder:</b> You can set a reminder with reference to a specific job to avoid any last minute hustle. The desired text/message will be delivered to your mail id at the selected time</p>\
        <p> &ensp; <b>c. Follow-up:</b> This is a flag to mark for reminding user whether a job requires a follow-up or not!</p>\
        <p><b>2. Comments:</b> Now people can comment on any job displayed on jobboard same way as any social media site like facebook/linkedIn/etc! Whether its about a crucial correction or an important last minute edit, people can post them as comments</p>\
        <p><b>3 Improved UI:</b> The newer version comes with an improved UI that is specially designed for programmers (yup, the color scheme will be softer on your eyes). We also have several performance optimizations that will improve your overall experience.</p>\
        <p>So spread the word and buckle up for the ride. You can check-out the newer version with all the aforementioned features here - <a target="_blank" href="nowornever.live/hiring-firing/">Hiring Firing</a>. (The domain has been shifted from https://pomodoro-nowornever.centralindia.cloudapp.azure.com/hiring-firing to https://nowornever.live/hiring-firing/) </p>\
        <p>Lastly, your feedback matters to us. Whatever thoughts you have on using this, share them with us here -<a target="_blank" href="https://forms.gle/hKkcD9UG15FZ6C7KA">Feedback</a> </p>\
        <p>Until next time,</p>\
        <p>Jofi</p>\
        <br/><br/>\
        <p>(do not reply to this mail)</P>\
        </div>';
        return mail;
    }

    function sendmail(body, transport) {
        var ht = getMailHTML();
        const mailOptions = {
            from: 'jofi.hiringfiring@gmail.com', // sender
            to: body.email, // receiver
            subject: 'Hiring-Firing just got updated!', // Subject
            html: ht // html body
        };
        transport.sendMail(mailOptions, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Email Sent!!');
            }
        })
    }

    app.post('/sendemail',async function(req,res) {
        console.log('Post ran');
        //getting access token
        const myOAuth2Client = new OAuth2(
            mailKeys.googleClientID,
            mailKeys.googleClientSecret,
            "https://developers.google.com/oauthplayground"
        );
        myOAuth2Client.setCredentials({
            refresh_token: mailKeys.refreshToken
        });
        const myAccessToken = await myOAuth2Client.getAccessToken();
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
        // var body = await Users.find({});
        // // console.log(body);
        // for (let i = 0; i < body.length; i++) {
        //     console.log(body[i].email);
        //     sendmail(body[i], transport)
        // }
        sendmail(req.body, transport)
    })
}