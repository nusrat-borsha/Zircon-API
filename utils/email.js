const nodemailer = require('nodemailer');

const sendEmail = async options => {

    //create transporter 
    const transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
        // debug: true,
        // logger: true,
    });

    const mailOptions = {
        from: 'Nusrat Borsha <nuameeen@gmail.com>',
        to: options.email,
        subject: options.subject,
        message: options.message,
        //html...
    }

    //send mail w/ the help of transporter object
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

