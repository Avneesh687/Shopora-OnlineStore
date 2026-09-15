const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `Shopora <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text: message
        });

        console.log("Email sent successfully");

    } catch (error) {
        console.error("Error sending email:", error.message);
        throw error;
    }
};

module.exports = sendEmail;