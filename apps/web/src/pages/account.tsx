import { type NextPage } from "next";

import { Layout } from "layouts/Layout";
import { workouts } from "data/mock";
import { NotImplemented } from "components/NotImplemented";
import { H3 } from "components/ui/Text";

const Account: NextPage = () => {
  const workout = workouts.amrap;
  return (
    <Layout>
      <H3>Account</H3>
      <NotImplemented />
    </Layout>
  );
};

export default Account;
