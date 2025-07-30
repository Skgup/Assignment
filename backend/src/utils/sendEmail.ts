import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // ✅ explicitly set Gmail SMTP host
  port: 587,              // ✅ use TLS
  secure: false,          // ✅ false for TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
console.log("DEBUG:", process.env.EMAIL_USER, process.env.EMAIL_PASS ? "PASS_SET" : "NO_PASS");

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Missing email credentials in environment variables");
    }

    const info = await transporter.sendMail({
      from: `"NoteApp" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent successfully:", info.response);
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    throw err;
  }
};
