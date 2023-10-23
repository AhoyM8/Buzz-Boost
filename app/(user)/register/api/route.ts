const mongoose = require("mongoose");
import { dbConnect, BuzzUser } from "@/lib/db";
import getEmailTemplate from "@/lib/test/emailGen";



import { cookies } from "next/headers";

dbConnect();

// console.log(processedEmail);

if (process.env.NODE_ENV !== "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

async function createUser() {
  try {
    const newUser = new BuzzUser({
      _id: new mongoose.Types.ObjectId(),
      username: "exampleusername",
      email: "exampleEmail",
      password: "examplePassword",
    });
    await newUser.save();
    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function POST(req: Request) {
  const post_data = await req.json();

  const { username, email, password } = post_data;
  try {
    const newUser = new BuzzUser({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      email: email,
      password: password,
    });
    await newUser.save();
    console.log("User created successfully");
    // save user
    const cookieStore = cookies();
    cookieStore.set("buzz-user", newUser._id);
    sendVerificationEmail(email, "123ABC");
    return Response.json({ success: "user created" });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "error creating user" });
  }
}

// "use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // host: "smtp.forwardemail.net",
  // port: 465,
  // secure: true,
  service: "gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendVerificationEmail(
  userEmail: string,
  verificationCode: string
) {
  console.log("Email:", process.env.GMAIL_USER);
  console.log("Password:", process.env.GMAIL_PASS); // Be careful about logging passwords in production!
  const processedEmail = await getEmailTemplate();
  console.log("processedEmail:", processedEmail);
  const verificationLink = `https://buzz-frontend.vercel.app/verify?code=${verificationCode}`;
  // send mail with defined transport object
  const info = await transporter.sendMail({
    // from: '"Fred Foo 👻" <foo@example.com>', // sender address
    from: `"Buzz" <${process.env.GMAIL_PASS}>`, // sender address
    // to: "bar@example.com, baz@example.com", // list of receivers
    to: userEmail,
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    // html: "<b>Hello world?</b>", // html body
    html: processedEmail,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

// sendVerificationEmail().catch(console.error);
