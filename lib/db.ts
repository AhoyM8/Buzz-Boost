import { cookies } from "next/headers";

const mongoose = require("mongoose");
const BuzzUser = require("./models/buzz_user");

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.s0wsemz.mongodb.net/Buzz-Boost`;

// connect to the database
async function dbConnect() {
  if (mongoose.connections[0].readyState) {
    return; // If it's already connected.
  }
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// get the user data from the cookie and return it
const CookieData = async () => {
  const cookieStore = cookies();
  const user = cookieStore.get("buzz-user");
  if (!user) {
    return "No user found";
  }
  if (user) {
    dbConnect();
    const userFound = BuzzUser.findOne({ _id: user.value }).then(
      (user: any) => {
        const { _id, username, email } = user;
        return { _id, username, email };
      }
    );
    return userFound;
  }
};

export { BuzzUser, CookieData, dbConnect };
