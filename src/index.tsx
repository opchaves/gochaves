import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { Page } from "./pages/page";
import { Top } from "./pages/top";

const app = new Hono();

// Model
export type Post = {
  id: string;
  title: string;
  body: string;
};

const posts: Post[] = [
  { id: "1", title: "Good Morning", body: "Let us eat breakfast" },
  { id: "2", title: "Good Afternoon", body: "Let us eat Lunch" },
  { id: "3", title: "Good Evening", body: "Let us eat Dinner" },
  { id: "4", title: "Good Night", body: "Let us drink Beer" },
];

// Logic
const getPosts = () => posts;

const getPost = (id: string) => {
  return posts.find((post) => post.id == id);
};

app.get("/*", serveStatic({ root: "./website/public" }));
app.get("/favicon.ico", serveStatic({ path: "./website/static/favicon.ico" }));

app.get("/api", (c) => {
  return c.json({ message: "Hello, World!" });
});

// Controller
app.get("/app", (c) => {
  const posts = getPosts();
  return c.html(<Top posts={posts} />);
});

app.get("/app/posts/:id{[0-9]+}", (c) => {
  const id = c.req.param("id");
  const post = getPost(id);
  if (!post) return c.notFound();
  return c.html(<Page post={post} />);
});

export default app;
