"use client";
import { BuzzContext } from "@/lib/BuzzContext";
import { useContext, useState, useEffect } from "react";
import { Button } from "@mantine/core";

export default function Page() {
  const { user } = useContext(BuzzContext);
  const { loggedIn, username, email, _id } = user;

  return (
    <>
      <h1>Page Demo</h1>
      <Button
        onClick={async () => {
          FetchTest(_id);
        }}
      >
        Log User
      </Button>
    </>
  );
}

const FetchTest = async (_id: string) => {
  // fetch POST req to /dashboard/api
  const res = await fetch("/dashboard/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // cookies are automatically sent with fetch requests if the url is on the same domain
    },
    body: JSON.stringify({
      _id,
    }),
  });
};
