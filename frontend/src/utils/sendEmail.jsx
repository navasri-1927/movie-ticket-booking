const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {

    const transporter = nodemailer.createTransport({

        service: "gmail",

        auth: {
            user: "yourgmail@gmail.com",
            pass: "yourapppassword"
        }

    });

    const mailOptions = {

        from: "Movie Booking",
        to,
        subject,
        text

    };

    await transporter.sendMail(mailOptions);

};

module.exports = sendEmail;