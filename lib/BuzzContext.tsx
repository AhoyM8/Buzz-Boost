"use client";

import { createContext, useEffect, useState } from "react";

export const BuzzContext = createContext<ContextType>({
  user: {
    _id: "",
    username: "",
    email: "",
    loggedIn: false,
  },
});

const getData = async () => {
  const res = await fetch("/api/user");
  const data = await res.json();
  return data;
};

export default function MainContext({ children }: { children: any }) {
  const [user, setUser] = useState<ContextType>({
    user: {
      _id: "",
      username: "",
      email: "",
      loggedIn: false,
    },
  });
  useEffect(() => {
    getData().then((data) => {
      if (data.error) {
        alert(data.error);
        return;
      }
      const { _id, username, email } = data.user;
      setUser({
        user: {
          _id,
          username,
          email,
          loggedIn: true,
        },
      });
    });
  }, []);
  const data: ContextType = {
    user: {
      _id: "",
      username: "",
      email: "",
    },
  };
  return <BuzzContext.Provider value={user}>{children}</BuzzContext.Provider>;
}

type ContextType = {
  user: {
    _id: string;
    username: string;
    email: string;
    loggedIn?: boolean;
  };
};
