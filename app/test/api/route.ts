const mongoose = require("mongoose");
import { dbConnect, BuzzUser } from "../../../lib/db";

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

export async function GET() {
  await createUser();
  const data = await BuzzUser.find();
  return Response.json({ data });
}
