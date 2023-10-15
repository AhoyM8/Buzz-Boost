"use client";
import { useContext, useState } from "react";
import { TestContext } from "./context";

import { MainContext } from "@/libs/MainContextProvider";
import { Button } from "@mantine/core";

async function getData() {
  const res = await fetch("https://api.github.com/users/vercel");
  const json = await res.json();
  console.log(json);
  return json;
}

export default function Page() {
  const takos_main = useContext(MainContext);
  const [user, setUser] = useState(takos_main.user);
  console.log(user);

  return (
    <>
      <div>
        <h1>Next</h1>
        <Button
          onClick={async () => {
            console.log("clicked");
            const data = await getData();
            console.log(data);
            setUser(data);

          }}
        >
          Click me
        </Button>
        <div>
          <h2>{user.id}</h2>
        </div>
      </div>
    </>
  );
}
