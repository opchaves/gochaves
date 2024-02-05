import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { Page } from "./pages/page";
import { Top } from "./pages/top";
import config from "./config";
import { db } from "./db/connection";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

const app = new Hono();

const getUsers = async () => db.select().from(users);

const getUser = async (id: string) => {
  return db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
    })
    .from(users)
    .where(eq(users.id, id));
};

app.get("/*", serveStatic({ root: "./website/public" }));
app.get("/favicon.ico", serveStatic({ path: "./website/static/favicon.ico" }));

app.get("/api", (c) => {
  return c.json({ message: "Hello, World!" });
});

// Controller
app.get("/app", async (c) => {
  const users = await getUsers();
  return c.html(<Top users={users} />);
});

app.get("/app/users/:id", async (c) => {
  const id = c.req.param("id");
  const user = await getUser(id);
  if (!user) return c.notFound();
  return c.html(<Page user={user[0]} />);
});

export default {
  port: config.PORT,
  fetch: app.fetch,
};
