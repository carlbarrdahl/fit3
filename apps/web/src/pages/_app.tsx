import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import { Web3AuthProvider } from "providers/Web3AuthProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Web3AuthProvider chain="mainnet" web3AuthNetwork="testnet">
      <Component {...pageProps} />
      <Analytics />
    </Web3AuthProvider>
  );
};

export default api.withTRPC(MyApp);
