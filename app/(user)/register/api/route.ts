const mongoose = require("mongoose");
import { dbConnect, BuzzUser } from "@/lib/db";

import { cookies } from "next/headers";

dbConnect();

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
    return Response.json({ success: "user created" });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "error creating user" });
  }
}
