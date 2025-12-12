import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendErrorEmail(subject, message) {
  try {
    await transporter.sendMail({
      from: `"Server Logger" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      subject,
      text: message,
    });
  } catch (err) {
    console.error("Failed to send error email:", err);
  }
}
