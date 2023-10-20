import { CookieData } from "@/lib/db";

export async function GET() {
  const user = await CookieData();
  return Response.json({ user });
}
