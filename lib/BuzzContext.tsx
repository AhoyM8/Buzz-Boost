"use client";

import { createContext, useEffect, useState } from "react";

type ContextType = {
  user: {
    _id: number;
    username: string;
    email: string;
  };
};

export const MainContext = createContext<ContextType>({
  user: {
    _id: 1,
    username: "",
    email: "naruto@email.com",
  },
});

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/user");
  const data = await res.json();
  return data;
};

export default function BuzzContext({ children }: { children: any }) {
  const [user, setUser] = useState<ContextType>({
    user: {
      _id: 1,
      username: "",
      email: "",
    },
  });
  useEffect(() => {
    getData().then((data) => {
      if (data.user !== "No user found") {
        console.log(data.user);
        const { _id, username, email } = data.user;
        setUser({
          user: {
            _id,
            username,
            email,
          },
        });
      }
    });
  }, []);

  const data: ContextType = {
    user: {
      _id: 1,
      username: "",
      email: "",
    },
  };
  return <MainContext.Provider value={user}>{children}</MainContext.Provider>;
}
