const nodemailer = require('nodemailer');
const twilio = require('twilio');

const sendEmailNotification = async (recipientEmail, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const sendSMSNotification = async (recipientPhone, message) => {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    try {
        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: recipientPhone,
        });
        console.log('SMS sent successfully');
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
};

module.exports = {
    sendEmailNotification,
    sendSMSNotification,
};