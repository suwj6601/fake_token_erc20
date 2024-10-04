import { http, createConfig } from "wagmi";
import { base, baseSepolia, Chain, mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

// export const config = createConfig({
//   chains: [sepolia],
//   transports: {
//     [mainnet.id]: http(),
//     [baseSepolia.id]: http(),
//   },
//   connectors: [metaMask()],
// });

export const config = createConfig({
  chains: [baseSepolia as Chain],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  multiInjectedProviderDiscovery: false,
  connectors: [metaMask()],
});
