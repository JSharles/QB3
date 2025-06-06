"use client";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { Button } from "../ui/button";
import { useMemo, useState } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { QB3_TOKEN_ADDRESS } from "@/lib/constants";
import { formatUnits } from "viem";

const CustomConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { data: balance, error: balanceError } = useBalance({ address });
  const { data: qb3Balance, error: qb3BalanceError } = useBalance({
    address,
    token: `0x${QB3_TOKEN_ADDRESS}`,
  });

  console.log("ETH Balance:", balance, "Error:", balanceError);
  console.log("QB3 Balance:", qb3Balance, "Error:", qb3BalanceError);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const baseButtonClasses =
    "px-6 py-3 border border-white text-white rounded-md bg-transparent transition-all duration-300 hover:bg-white hover:text-black";

  const ethBalanceFormatted = useMemo(
    () =>
      balance ? formatUnits(balance.value, balance.decimals) : "Loading...",
    [balance]
  );
  const qb3BalanceFormatted = useMemo(
    () =>
      qb3Balance ? formatUnits(qb3Balance.value, qb3Balance.decimals) : "",
    [qb3Balance]
  );

  if (!isConnected) {
    return (
      <Button
        onClick={openConnectModal}
        className={baseButtonClasses}
        type="button"
      >
        Connect Wallet
      </Button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button className={baseButtonClasses}>
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-black/20 backdrop-blur-md border border-white/10 rounded-md p-2 w-64"
        >
          <div className="text-white text-sm px-3 py-2 flex justify-between items-center">
            <span className="truncate">{address}</span>
            <button onClick={copyToClipboard} className="text-white text-xs">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="border-t border-gray-700 my-2" />
          <div className="text-white text-sm px-3 py-2">
            ETH: {ethBalanceFormatted} {balance?.symbol}
          </div>
          {qb3Balance && (
            <div className="text-white text-sm px-3 py-2">
              QB3: {qb3BalanceFormatted} {qb3Balance.symbol}
            </div>
          )}
          <div className="border-t border-gray-700 my-2" />
          <DropdownMenuItem
            onClick={() => {
              disconnect();
              setIsMenuOpen(false);
            }}
            className="cursor-pointer !text-red-500 hover:!text-red-800 hover:bg-transparent focus:bg-transparent"
          >
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CustomConnectButton;
