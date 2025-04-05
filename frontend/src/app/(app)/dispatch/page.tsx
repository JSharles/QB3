import DispatchRequestForm from "@/components/dispatch-request-form/DispatchRequestForm";
import Footer from "@/components/footer/footer";

const DispatchInventoryPage = () => {
  return (
    <>
      <div className="relative min-h-[calc(100vh-80px)] w-full">
        <div className="absolute bottom-46 right-8 max-w-xl px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary-foreground/60">
            <span className="text-primary-foreground">QB3</span> brings you{" "}
            <span className="text-primary-foreground">
              closer to your customers
            </span>
            . Accelerate{" "}
            <span className="text-primary-foreground">deliveries</span> and
            build <span className="text-primary-foreground">trust</span> through
            a <span className="text-primary-foreground">decentralized</span>{" "}
            network of{" "}
            <span className="text-primary-foreground">local storage</span> —
            built for{" "}
            <span className="text-primary-foreground">transparency</span> and{" "}
            <span className="text-primary-foreground">efficiency</span>.
          </h1>
          <p className="text-xl text-primary-foreground/60">
            Store smarter. Ship faster. Grow stronger.
          </p>
        </div>
      </div>
      <DispatchRequestForm />
      <Footer />
    </>
  );
};

export default DispatchInventoryPage;
