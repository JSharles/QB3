import Footer from "@/components/footer/footer";

export default function HomePage() {
  return (
    <>
      <div className="relative min-h-[calc(100vh-80px)] w-full">
        <div className="absolute bottom-46 right-8 max-w-xl px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary-foreground/60">
            <span className="text-primary-foreground">QB3</span> is a{" "}
            <span className="text-primary-foreground">blockchain-powered</span>{" "}
            network of micro-warehouses enabling{" "}
            <span className="text-primary-foreground">decentralized</span>,{" "}
            <span className="text-primary-foreground">accessible</span>, and{" "}
            <span className="text-primary-foreground">incentive-aligned</span>{" "}
            logistics
          </h1>
          <p className="text-xl text-primary-foreground/60">
            owned and powered by its users
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
