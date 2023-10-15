"use client";

import { createContext } from "react";

type MainContextType = {
  user: {
    id: number;
    nickname: string;
    email: string;
  };
};

export const MainContext = createContext<MainContextType>({
  user: {
    id: 0,
    nickname: "",
    email: "",
  },
});

export default function MainContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const takos: MainContextType = {
    user: {
      id: 1,
      nickname: "",
      email: "",
    },
  };
  return <MainContext.Provider value={takos}>{children}</MainContext.Provider>;
}
