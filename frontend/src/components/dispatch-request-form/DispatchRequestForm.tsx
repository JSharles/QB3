"use client";

import { useState } from "react";
import Image from "next/image";
import { keccak256, toBytes } from "viem";
import { useReadContract } from "wagmi";

import { SPACE_REGISTRY_ABI, SPACE_REGISTRY_ADDRESS } from "@/lib/constants";

const DispatchRequestForm = () => {
  const [zoneHash, setZoneHash] = useState<`0x${string}` | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const { data: zoneInfo } = useReadContract({
    address: `0x${SPACE_REGISTRY_ADDRESS}`,
    abi: SPACE_REGISTRY_ABI,
    functionName: "getZoneInfo",
    args: [
      zoneHash ??
        "0x0000000000000000000000000000000000000000000000000000000000000000",
    ],
    query: {
      enabled: !!zoneHash,
    },
  }) as {
    data: [bigint, bigint] | undefined;
  };

  const handleCityClick = (city: string) => {
    const hash = keccak256(toBytes(city));
    setSelectedCity(city);
    setZoneHash(hash);
  };

  return (
    <section className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/e-commerce.webp"
          alt="Background"
          fill
          className="object-cover grayscale brightness-[0.3]"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-purple-500/15 z-0" />

      <div className="relative z-10 w-full max-w-7xl px-4">
        <div className="w-full min-h-[600px] bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative flex items-center justify-center">
            <Image
              src="/images/france-map.png"
              alt="Map of France"
              width={600}
              height={600}
              className="object-contain"
            />

            <div
              className="absolute w-28 h-28  cursor-pointer"
              style={{ top: "16%", left: "42%" }}
              onClick={() => handleCityClick("paris")}
            />

            <div
              className="absolute w-28 h-28  cursor-pointer"
              style={{ top: "70%", left: "60%" }}
              onClick={() => handleCityClick("marseille")}
            />
          </div>

          <div className="flex items-center justify-center text-white text-center">
            {selectedCity && zoneInfo ? (
              <div className="space-y-4">
                <p className="text-3xl font-bold">
                  {selectedCity.toUpperCase()}
                </p>
                <p className="text-2xl">
                  Capacity:{" "}
                  <span className="font-semibold">{Number(zoneInfo[0])}</span>{" "}
                  m³
                  <br />
                  Used:{" "}
                  <span className="font-semibold">
                    {Number(zoneInfo[1])}
                  </span>{" "}
                  m³
                  <br />
                  Available:{" "}
                  <span className="font-semibold">
                    {Number(zoneInfo[0]) - Number(zoneInfo[1])}
                  </span>{" "}
                  m³
                </p>
              </div>
            ) : (
              <p className="text-2xl">Click on a city to view zone info</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DispatchRequestForm;
