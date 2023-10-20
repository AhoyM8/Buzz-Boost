import TestProvider from "./context";
const mongoose = require("mongoose");

const { dbConnect, BuzzUser } = require("@/lib/db");

const myDatabaseData = async () => {
  await dbConnect(); // Ensure database connection

  // Use the admin database to list all databases
  const admin = new mongoose.mongo.Admin(mongoose.connection.db);

  const result = await admin.listDatabases();
  // Extract just the names of the databases
  const databaseNames = result.databases.map((db: any) => db.name);

  return databaseNames;
};

async function createUser() {
  try {
    const newUser = new BuzzUser({
      _id: new mongoose.Types.ObjectId(),
      username: "exampleusername",
      email: "exampleEmail",
      password: "examplePassword",
    });
    await newUser.save();
    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export default async function TestLayout({
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
