const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'coffee.express.server@gmail.com',
        pass: process.env.PASSWORD
    }
});

module.exports = (to, subject, text, callback = () => {}) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: 'coffee.express.server@gmail.com',
            to,
            subject,
            text
        }, (err, info) => {
            if (err) {
                reject(err.message);
            } else {
                callback();
                resolve(info.respone);
            }
        })
    })
}