'use client';

import { MainContext } from "@/lib/BuzzContext";

import { useContext } from "react";

export function LoggedIn() {
  const { user } = useContext(MainContext);
  console.log(user);
  if (user.username === "") {
    return <h1>Not logged in</h1>;
  }
  return (
    <div>
      <h1>Logged in as {user.username}</h1>
    </div>
  );
}

export default LoggedIn;