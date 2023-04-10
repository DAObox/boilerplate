import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import "../styles/globals.css";
import { AragonProvider } from "@daobox/use-aragon";
import { chains, client } from "../config/wagmiConfig";
import AppShell from "../components/layout/AppShell";
import { Toaster } from "react-hot-toast";
import { useIsMounted } from "hooks";

function App({ Component, pageProps }: AppProps) {
  // this is a hack to prevent the app from rendering on the server before the client
  const isMounted = useIsMounted();

  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains} showRecentTransactions={true}>
        <AragonProvider>
          {/* only render the app after the client has mounted */}
          {isMounted && (
            <AppShell>
              <Component {...pageProps} />
            </AppShell>
          )}
          <Toaster />
        </AragonProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
