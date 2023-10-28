"use client";
import { BuzzContext } from "@/lib/BuzzContext";
import Link from "next/link";
import { useContext, useState, useEffect, use } from "react";

export function VerificationNav() {
  const { user } = useContext(BuzzContext);
  console.log(user);
  const { loggedIn, username, email, _id, verified } = user;
  const [userVerified, setUserVerified] = useState(true);
  useEffect(() => {
    console.log("user changed");
    console.log(user);
    setUserVerified(user.verified as boolean);
  }, [user]);
  if (!loggedIn) return <></>; // if not logged in, don't show anything
  if (userVerified) return <></>; // if verified, don't show anything

  return (
    <>
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded relative text-center">
        Current User: {username} is not verified. Please check your email for a
        verification link or{" "}
        <span
          className="underline cursor-pointer text-blue-500"
          onClick={() => {
            requestNewVerificationLink(_id);
            // alert("A new verification link has been sent to your email.");
            console.log("A new verification link has been sent to your email.");
          }}
        >
          request a new one
        </span>
      </div>
    </>
  );
}

async function requestNewVerificationLink(id: string) {
  fetch("/api/newVerification", {
    method: "POST",
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        alert(data.success);
      } else {
        alert(data.error);
      }
    });
}
