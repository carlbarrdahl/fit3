import { type NextPage } from "next";

import { Layout } from "layouts/Layout";
import { workouts } from "data/mock";
import { NotImplemented } from "components/NotImplemented";
import { H3 } from "components/ui/Text";
import { LoginButton } from "features/auth/components/LoginButton";

const Account: NextPage = () => {
  const workout = workouts.amrap;
  return (
    <Layout>
      <H3>Account</H3>

      <div className="mb-2 flex justify-end">
        <LoginButton />
      </div>
      <NotImplemented />
    </Layout>
  );
};

export default Account;
