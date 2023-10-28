import { NextRequest } from "next/server";
import { dbConnect, BuzzUser } from "@/lib/db";
import { cookies } from "next/headers";
dbConnect();

let url = "https://buzz-frontend.vercel.app";
if (process.env.NODE_ENV !== "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  url = "http://localhost:3000";
}

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  // if user cookie exists, check if verified
  if (cookieStore.get("buzz-user")) {
    const userFound = await BuzzUser.findOne({
      _id: cookieStore.get("buzz-user"),
    }).then((user: any) => {
      if (!user) {
        return Response.json({ error: "user not found" });
      }
      return user;
    });
    if (userFound.verified) {
      return Response.redirect(`${url}/`);
    }
  }
  const token = request.nextUrl.searchParams.get("token");
  try {
    const userFound = await BuzzUser.findOne({ verificationToken: token }).then(
      (user: any) => {
        if (!user) {
          return Response.json({ error: "user not found" });
        }
        return user;
      }
    );

    // check if the token is expired
    if (userFound.verificationTokenExpiry < Date.now()) {
      return Response.redirect(`${url}/verify/expired`);
    }

    await userFound.updateOne({
      $set: { verified: true },
      $unset: { verificationToken: 1, verificationTokenExpiry: 1 },
    });

    await userFound.save();
    cookieStore.set("buzz-user", userFound._id);
    return Response.redirect(`${url}/verify`);
  } catch (error) {
    console.error("Error finding user:", error);
    return Response.json({ error: "error finding user" });
  }
}
