// middleware.ts
import { NextResponse, NextRequest } from "next/server";

let url = "https://buzz-boost.vercel.app";
if (process.env.NODE_ENV !== "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  url = "http://localhost:3000";
}

export function middleware(request: NextRequest) {
  // Check for the "buzz-user" cookie
  const cookie = request.cookies.get("buzz-user");

  // If the cookie exists and the request is for the "/login" path, redirect to "/"
  if (
    cookie &&
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(url); // Use your domain here
  }
  //   if cookie do not exist block the user from accessing the dashboard
  if (!cookie && request.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(url); // Use your domain here
  }

  // Otherwise, proceed with the request as usual
  return NextResponse.next();
}

// Optional: Configure the middleware to run only on the "/login" path
export const config = {
  matcher: "/login" || "/register" || "/dashboard",
};
