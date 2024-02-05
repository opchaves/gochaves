import bcrypt from "bcryptjs";
import { sql } from "drizzle-orm";
import config from "../config";
import { db } from "./connection";
import * as schema from "./schema";
import { nanoid } from "nanoid";

async function main() {
  console.log("Seeding database...");

  const password = await bcrypt.hash("password12", 10);
  const userId1 = nanoid(config.ID_SIZE);
  const userId2 = nanoid(config.ID_SIZE);

  await db.insert(schema.users).values([
    {
      id: userId1,
      email: "opchaves@example.com",
      password,
      firstName: "Paulo",
      lastName: "Chaves",
      verified: true,
    },
    {
      id: userId2,
      email: "hellen@example.com",
      password,
      firstName: "Hellen",
      lastName: "Chaves",
      verified: true,
    },
  ]);

  const workspaceId1 = nanoid(config.ID_SIZE);
  const workspaceId2 = nanoid(config.ID_SIZE);

  await db.insert(schema.workspaces).values([
    {
      id: workspaceId1,
      name: "Personal",
      userId: userId1,
    },
    {
      id: workspaceId2,
      name: "Personal",
      userId: userId2,
    },
  ]);

  console.log("Database seeded.");
}

await main();
