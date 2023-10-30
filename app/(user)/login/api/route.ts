import { dbConnect, BuzzUser } from "@/lib/db";
import { cookies } from "next/headers";

dbConnect();

export async function POST(req: Request) {
  const POST_body = await req.json();
  const { email, password, rememberMe } = POST_body;

  try {
    const userFound = await BuzzUser.findOne({ email: email }).then((user: any) => {
      // check password
      if (!user) {
        return Response.json({ error: "user not found" });
      }
      if (user.password !== password) {
        return Response.json({ error: "incorrect password" });
      }
      return user;
    });

    // set user _id in cookie
    const cookieStore = cookies();
    
    if (rememberMe) {
      cookieStore.set("buzz-user", userFound._id, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365) }); // 1 year
    } else {
      cookieStore.set("buzz-user", userFound._id);
    }
    return Response.json({ success: "user found" });
  } catch (error) {
    console.error("Error finding user:", error);
    return Response.json({ error: "error finding user" });
  }
}
