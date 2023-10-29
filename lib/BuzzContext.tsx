"use client";

import { createContext, useEffect, useState } from "react";

export const BuzzContext = createContext<ContextType>({
  user: {
    _id: "",
    username: "",
    email: "",
    verified: true,
    loggedIn: false,
  },
});

const getData = async () => {
  const res = await fetch("/api/user", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export default function MainContext({ children }: { children: any }) {
  const [user, setUser] = useState<ContextType>({
    user: {
      _id: "",
      username: "",
      email: "",
      verified: true,
      loggedIn: false,
    },
  });
  useEffect(() => {
    getData().then((data) => {
      if (data.error) {
        // alert(data.error);
        return;
      }
      const { _id, username, email, verified } = data.user;
      console.log(data.user);
      console.log(_id, username, email, verified);
      setUser({
        user: {
          _id,
          username,
          email,
          loggedIn: true,
          verified,
        },
      });
    });
  }, []);

  return <BuzzContext.Provider value={user}>{children}</BuzzContext.Provider>;
}

type ContextType = {
  user: {
    _id: string;
    username: string;
    email: string;
    verified: boolean;
    loggedIn?: boolean;
  };
};
