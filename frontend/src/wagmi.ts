import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { hardhat } from "wagmi/chains";
import { createPublicClient, http } from "viem";

export const config = getDefaultConfig({
  appName: "QB3",
  projectId: "YOUR_PROJECT_ID",
  chains: [hardhat],
  ssr: true,
});

export const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(),
});
