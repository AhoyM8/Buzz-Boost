"use client";
import { useContext, useState } from "react";
import { TestContext } from "./context";

import { BuzzContext } from "@/lib/BuzzContext";
import { Button } from "@mantine/core";

async function getData() {
  const res = await fetch("/test/apitako");
  const json = await res.json();
  return json;
}

export default function Page() {
  return (
    <>
      <div>
        <h1>Next</h1>
        <Button
          onClick={async () => {
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
