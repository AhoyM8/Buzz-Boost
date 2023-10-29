import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Buzz Boost Dashboard",
};

export default function PageLayout({ children }: { children: any }) {
  return <>{children}</>;
}
