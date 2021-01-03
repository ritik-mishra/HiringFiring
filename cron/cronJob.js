var cron = require('node-cron');
const mongoose = require('mongoose');
const Reminder = mongoose.model('reminder');
var Cron = function Cron() {
    console.log("in cron");
    function sendMail(data) {
        console.log(data);
    }
    async function utilFun() {
        console.log('this will run every minute at zero second');
        var d = Date.now() + 55 * 6 * 60 * 1000;
        var md = 10 * 60 * 1000;
        d = d - (d % md);
        var arr = await Reminder.find({ time: d });
        Reminder.deleteMany({ time: d });
        console.log(arr);
        for (let i = 0; i < arr.length; i++) {
            sendMail(arr[i]);
        }
    }
    cron.schedule('0 * * * * *', () => {
        utilFun();
    },
        {
            scheduled: true,
            timezone: "Asia/Kolkata"
        }
    );
    console.log("at the end of cron");
}
module.exports.Cron = Cron;