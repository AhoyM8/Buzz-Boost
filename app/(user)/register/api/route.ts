const mongoose = require("mongoose");
import { dbConnect, BuzzUser } from "@/lib/db";
import { cookies } from "next/headers";
import { sendVerificationEmail, token, tokenExpiry } from "@/lib/VerifyEmail";

dbConnect();

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
    await sendVerificationEmail(email, token);
    return Response.json({ success: "user created" });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "error creating user" });
  }
}
