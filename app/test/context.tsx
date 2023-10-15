"use client";

import { createContext } from "react";

type TestContextType = {
  id: number;
  name: string;
  full_name: string;
  email?: string;
};
export const TestContext = createContext<TestContextType>({
  id: 0,
  name: "",
  full_name: "",
});
export default function TestProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const takos_test: TestContextType = {
    id: 1,
    name: "takos",
    full_name: "takos",
  };
  return (
    <TestContext.Provider value={takos_test}>{children}</TestContext.Provider>
  );
}
