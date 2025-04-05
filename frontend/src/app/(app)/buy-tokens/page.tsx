"use client";

import Image from "next/image";

const exchanges = [
  { name: "Uniswap DEX", logo: "/images/uniswap-uni-logo.png", link: "#" },
  { name: "CoinGecko", logo: "/images/coingecko-logo.png", link: "#" },
];

const BuyTokenPAge = () => {
  return (
    <section className="flex flex-col items-center justify-center py-56">
      <div className="relative bg-gradient-to-br from-[#0e0e2c] to-[#1a1a4a] rounded-2xl p-10 text-center shadow-xl">
        <div className="mb-4 text-3xl font-bold text-white">0.273 USD</div>
        <div className="text-sm text-gray-300">Price for 1 QB3</div>
        <div className="mt-2 text-xs text-gray-500">Powered by CoinGecko</div>
      </div>

      <h2 className="mt-20 mb-6 text-sm font-semibold text-blue-600 uppercase">
        QB3 real-time price on
      </h2>
      <h3 className="text-3xl font-bold mb-10 text-white">
        Exchanges & Aggregators
      </h3>

      <div className="flex flex-wrap justify-center gap-10">
        {exchanges.map(({ name, logo, link }) => (
          <a
            key={name}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 transition-transform hover:scale-105"
          >
            <div className="w-16 h-16 rounded-full bg-white p-2 shadow-md">
              <Image src={logo} alt={name} width={48} height={48} />
            </div>
            <span className="text-xs font-medium">{name}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BuyTokenPAge;
