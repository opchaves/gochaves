import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import config from "../config";
import { db } from "./connection";

console.log(`Mode: ${config.NODE_ENV}`);
console.log(`Database URL: ${config.DB_URL}`);
console.log(`Migrating database...`);

migrate(db, { migrationsFolder: "./migrations" });
