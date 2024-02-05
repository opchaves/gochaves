import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import config from "../config";
import * as schema from "./schema";
import { sql } from "drizzle-orm";

const sqlite = new Database(config.DB_URL);

const db = drizzle(sqlite, {
  schema,
  logger: config.DB_LOGGER,
});

db.run(sql`PRAGMA journal_mode = wal;`);
// NOTE is this necessary?
db.run(sql`PRAGMA busy_timeout = 5000;`);
db.run(sql`PRAGMA synchronous = NORMAL;`);

export { db };
