import { dbConnect, BuzzUser } from "@/lib/db";
import { sendVerificationEmail, token, tokenExpiry } from "@/lib/VerifyEmail";

dbConnect();

export async function POST(req: Request) {
  const POST_body = await req.json();
  const _id = POST_body.id;
  try {
    const userFound = await BuzzUser.findOne({ _id: _id }).exec();
    // check if user verified field is true
    if (userFound && userFound.verified) {
      return Response.json({ error: "user already verified" });
    } else if (userFound) {
      // resend verification email user email and replace token and token expiry
      // sendVerificationEmail(userFound.email, token);
      const email_sent = await sendVerificationEmail( userFound.email, token );
      // update user verification token and token expiry using $set
      await BuzzUser.updateOne(
        { _id: _id },
        {
          $set: {
            verificationToken: token,
            verificationTokenExpiry: tokenExpiry
          }
        }
      );

      return Response.json({ success: "email verification sent", email_sent });
    } else {
      return Response.json({ error: "user not found" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return Response.json({ error: "error processing request" });
  }
}
