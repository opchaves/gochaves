import { Layout } from "../components/Layout";
import type { User } from "./top";

export const Page = (props: { user: Partial<User> }) => {
  return (
    <Layout title={props.user.firstName!}>
      <main>
        <h2>{props.user.firstName}</h2>
        <p>{props.user.email}</p>
      </main>
    </Layout>
  );
};
