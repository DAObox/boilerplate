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

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains} showRecentTransactions={true}>
        <AragonProvider>
          {mounted && (
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
