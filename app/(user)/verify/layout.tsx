const mongoose = require("mongoose");

const { dbConnect, BuzzUser } = require("@/lib/db");

export default async function PageLayou({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string | 'null';
}) {
    console.log("token", token);
  return (
    <div>
      <p>sula</p>
      {token && <p>Token: {token}</p>}
      {children}
    </div>
  );
}
