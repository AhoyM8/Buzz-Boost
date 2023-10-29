const nodemailer = require("nodemailer");
import crypto from "crypto";

let url = "https://buzz-boost.vercel.app";
if (process.env.NODE_ENV !== "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  url = "http://localhost:3000";
}

function generateToken() {
  return crypto.randomBytes(16).toString("hex");
}

const token = generateToken();
const tokenExpiry = new Date();
tokenExpiry.setHours(tokenExpiry.getHours() + 24);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

async function sendVerificationEmail(
  userEmail: string,
  verificationCode: string
) {
  const verificationLink = `${url}/verify/api?token=${verificationCode}`;
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
  return info.messageId;
}

export { sendVerificationEmail, token, tokenExpiry };

async function getEmailTemplate(username: string, verificationLink: string) {
  const response = await fetch(`${url}/email_template.html`);
  const emailTemplate = await response.text();
  // console.log("Email template:", emailTemplate);
  return emailTemplate
    .replace("{{username}}", username)
    .replace("{{link}}", verificationLink);
}
