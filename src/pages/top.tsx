import { InferSelectModel } from "drizzle-orm";
import { Layout } from "../components/Layout";
import { users } from "../db/schema";

export type User = InferSelectModel<typeof users>;

const List = (props: { user: User }) => (
  <li>
    <a href={`/app/users/${props.user.id}`}>{props.user.firstName}</a>
  </li>
);

export const Top = (props: { users: User[] }) => {
  return (
    <Layout title={"Top"}>
      <main>
        <h2>Posts</h2>
        <ul>
          {props.users.map((user) => (
            <List user={user} />
          ))}
        </ul>
      </main>
    </Layout>
  );
};
