const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL, // Sender email address
    pass: process.env.SMTP_PASSWORD, // Email password or app password
  },
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL, // Sender email address
      to, // Recipient email address
      subject, // Subject of the email
      text, // Body of the email
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = {
  sendEmail,
};