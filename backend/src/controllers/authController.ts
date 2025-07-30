import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import generateJWT from "../utils/generateJWT";
import { sendEmail } from "../utils/sendEmail"; // ✅ Import email utility

// OTP storage (in-memory)
let otpStore: Record<string, string> = {};

// ✅ Step 1: Send OTP to email
export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  try {
    // ✅ Send OTP via email
    await sendEmail(email, "Your OTP Code", `Your OTP for NoteApp is: ${otp}`);
    res.json({ message: "OTP sent successfully to email" });
  } catch (err) {
    console.error("Email sending error:", err);
    res.status(500).json({ error: "Failed to send OTP email" });
  }
};

// ✅ Step 2: Verify OTP and Create Account
export const verifyOtp = async (req: Request, res: Response) => {
  const { name, email, otp } = req.body;
  if (!name || !email || !otp) return res.status(400).json({ error: "All fields are required" });

  if (otpStore[email] !== otp) return res.status(400).json({ error: "Invalid or expired OTP" });

  // ✅ Clear OTP after verification
  delete otpStore[email];

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name, email });
  }

 const token = generateJWT((user._id as string).toString());  res.json({ token, user });
};

// ✅ Google OAuth will be implemented later
