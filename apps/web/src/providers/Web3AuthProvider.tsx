import { ADAPTER_EVENTS } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

import { createWalletClient, custom } from "viem";
import { goerli } from "viem/chains";

import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";

export const WEB3AUTH_NETWORK = {
  mainnet: {
    displayName: "Mainnet",
  },
  testnet: {
    displayName: "Testnet",
  },
  cyan: {
    displayName: "Cyan",
  },
} as const;

export type WEB3AUTH_NETWORK_TYPE = keyof typeof WEB3AUTH_NETWORK;

export interface IWeb3AuthContext {
  web3Auth: Web3Auth | null;
  isLoading: boolean;
  chain: string;
  user: unknown;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const Web3AuthContext = createContext<IWeb3AuthContext>({
  web3Auth: null,
  isLoading: false,
  chain: "",
  user: null,
  login: async () => {},
  logout: async () => {},
});

export function useWeb3Auth(): IWeb3AuthContext {
  return useContext(Web3AuthContext);
}

interface IWeb3AuthState {
  web3AuthNetwork: WEB3AUTH_NETWORK_TYPE;
  chain: string;
  children: ReactNode;
}
interface IWeb3AuthProps {
  children?: ReactNode;
  web3AuthNetwork: WEB3AUTH_NETWORK_TYPE;
  chain: string;
}

export const Web3AuthProvider: FunctionComponent<IWeb3AuthState> = ({
  children,
  web3AuthNetwork,
  chain,
}: IWeb3AuthProps) => {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [user, setUser] = useState<unknown | null>(null);
  const [client, setClient] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const subscribeAuthEvents = (web3auth: Web3Auth) => {
      // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
      web3auth.on(ADAPTER_EVENTS.CONNECTED, async (data: unknown) => {
        console.log("Yeah!, you are successfully logged in", data);

        const client = createWalletClient({
          chain: goerli,
          transport: custom(web3auth.provider!),
        });

        setClient(client);
        console.log("Address", await client.getAddresses());
      });

      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log("connecting");
      });

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log("disconnected");
        setUser(null);
      });

      web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
        console.error("some error or user has cancelled login request", error);
      });
    };

    async function init() {
      try {
        const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID as string;
        setIsLoading(true);
        console.log(clientId);
        const web3AuthInstance = new Web3Auth({
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x5",
            rpcTarget: `https://eth-goerli.g.alchemy.com/v2/SqRHw2HjBjLCbvoAu0TYCirdJhF_wsaC`,
          },
          clientId,
        });

        const adapter = new OpenloginAdapter({
          adapterSettings: { network: web3AuthNetwork },
        });
        web3AuthInstance.configureAdapter(adapter);
        subscribeAuthEvents(web3AuthInstance);
        setWeb3Auth(web3AuthInstance);

        await web3AuthInstance.initModal();

        const user = await web3AuthInstance?.getUserInfo();
        setUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [chain, web3AuthNetwork]);

  const login = async () => {
    await web3Auth?.connect();
    setUser(await web3Auth?.getUserInfo());
  };

  const logout = async () => {
    await web3Auth?.logout();
  };

  const contextProvider = {
    web3Auth,
    chain,
    client,
    user,
    isLoading,
    login,
    logout,
  };

  return (
    <Web3AuthContext.Provider value={contextProvider}>
      {children}
    </Web3AuthContext.Provider>
  );
};
