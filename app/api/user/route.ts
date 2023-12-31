import { dbConnect, BuzzUser } from "@/lib/db";
import { cookies } from "next/headers";

dbConnect();

export async function GET(req: Request) {
  const user_id_cookie = cookies().get("buzz-user");
  const _id = user_id_cookie?.value;

  try {
    const userFound = await BuzzUser.findOne({ _id: _id }).then((user: any) => {
      return user;
    });
    return Response.json({
      success: "user found",
      user: {
        _id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        verified: userFound.verified,
      },
    });
  } catch (error) {
    return Response.json({ error: "error finding user" });
  }
}
