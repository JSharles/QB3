import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { hardhat, sepolia } from "wagmi/chains";
import { createPublicClient, http } from "viem";

const chain = process.env.NEXT_PUBLIC_CHAIN_ENV === "local";

const selectedChain = chain ? hardhat : sepolia;

export const config = getDefaultConfig({
  appName: "QB3",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [selectedChain],
  ssr: true,
});

export const publicClient = createPublicClient({
  chain: selectedChain,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
});
