import TestProvider from "./context";

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TestProvider>{children}</TestProvider>
    </>
  );
}
