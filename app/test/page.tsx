"use client";
import { useContext, useState } from "react";
import { TestContext } from "./context";

import { MainContext } from "@/lib/BuzzContext";
import { Button } from "@mantine/core";

async function getData() {
  const res = await fetch("http://localhost:3000/test/apitako");
  console.log(res);
  const json = await res.json();
  console.log(json);
  return json;
}

export default function Page() {
  return (
    <>
      <div>
        <h1>Next</h1>
        <Button
          onClick={async () => {
            console.log("clicked");
            const data = await getData();
          }}
        >
          Click me
        </Button>
        <div></div>
      </div>
    </>
  );
}
