"use client";

import { useAccount, useDisconnect, useBalance } from "wagmi";
import { Button } from "../ui/button";
import { useState } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const CustomConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

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
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button className={baseButtonClasses}>
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-[#67a5fc]] border border-white rounded-md p-2 w-64"
      >
        <div className="text-white text-sm px-3 py-2 flex justify-between items-center">
          <span className="truncate">{address}</span>
          <button onClick={copyToClipboard} className="text-white text-xs">
            {copied ? "Copié !" : "Copier"}
          </button>
        </div>
        <div className="border-t border-gray-700 my-2" />

        <div className="text-white text-sm px-3 py-2">
          Solde:{" "}
          {balance ? `${balance.formatted} ${balance.symbol}` : "Chargement..."}
        </div>
        <div className="border-t border-gray-700 my-2" />

        <DropdownMenuItem
          onClick={() => {
            disconnect();
            setIsMenuOpen(false);
          }}
          className="cursor-pointer !text-red-500 hover:!text-red-800 hover:bg-transparent focus:bg-transparent"
        >
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomConnectButton;
