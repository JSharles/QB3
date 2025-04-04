import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { hardhat, sepolia } from "wagmi/chains";
import { createPublicClient, http } from "viem";

const chain = process.env.NEXT_PUBLIC_CHAIN_ENV === "local";
const selectedChain = chain ? hardhat : sepolia;

export const config = getDefaultConfig({
  appName: "QB3",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [selectedChain],
  transports: {
    [selectedChain.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL || "https://rpc.sepolia.org"
    ),
  },
  ssr: true,
});

export const publicClient = createPublicClient({
  chain: selectedChain,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL || "https://rpc.sepolia.org"),
});

console.log("Selected Chain:", selectedChain.name);
console.log("RPC URL:", process.env.NEXT_PUBLIC_RPC_URL);
