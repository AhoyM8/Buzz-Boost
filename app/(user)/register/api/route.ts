const mongoose = require("mongoose");
import { dbConnect, BuzzUser } from "@/lib/db";
import { cookies } from "next/headers";

dbConnect();

let url = "https://buzz-frontend.vercel.app";
if (process.env.NODE_ENV !== "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  url = "http://localhost:3000";
}

const token = generateToken();
const tokenExpiry = new Date();
tokenExpiry.setHours(tokenExpiry.getHours() + 24);

export async function POST(req: Request) {
  const post_data = await req.json();
  const { username, email, password } = post_data;
  console.log(username, email, password);

  try {
    const newUser = new BuzzUser({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      email: email,
      password: password,
      verified: false,
      verificationToken: token,
      verificationTokenExpiry: tokenExpiry,
    });
    await newUser.save();
    console.log("User created successfully");
    // save user
    const cookieStore = cookies();
    cookieStore.set("buzz-user", newUser._id);
    console.log(email, token);
    sendVerificationEmail(email, token);
    return Response.json({ success: "user created" });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "error creating user" });
  }
}

const nodemailer = require("nodemailer");

// const verificationLink = `https://your-website.com/verify?token=${token}`;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

import crypto from "crypto";

function generateToken() {
  return crypto.randomBytes(16).toString("hex");
}

async function getEmailTemplate(username: string, verificationLink: string) {
  const response = await fetch(`${url}/email_template.html`);
  const emailTemplate = await response.text();
  // console.log("Email template:", emailTemplate);
  return emailTemplate
    .replace("{{username}}", "John Doe")
    .replace("{{link}}", verificationLink);
}

async function sendVerificationEmail(
  userEmail: string,
  verificationCode: string
) {
  const verificationLink = `${url}/verify/api?code=${verificationCode}`;
  const processedEmail = await getEmailTemplate(userEmail, verificationLink);
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Buzz" <${process.env.GMAIL_USER}>`, // sender address
    to: userEmail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: processedEmail, // html body
  });

  console.log("Message sent: %s", info.messageId);
}
