import Footer from "@/components/footer/footer";
import HostApplicationForm from "@/components/host-application-form/host-application-form";

const ProvideStoragePage = () => {
  return (
    <>
      <div className="relative min-h-[calc(100vh-80px)] w-full">
        <div className="absolute bottom-46 right-8 max-w-xl px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary-foreground/60">
            Connect your space to a{" "}
            <span className="text-primary-foreground">blockchain-powered</span>{" "}
            logistics network. Earn{" "}
            <span className="text-primary-foreground">QB3</span>, unlock{" "}
            <span className="text-primary-foreground">bonuses</span>, build{" "}
            <span className="text-primary-foreground">reputation</span>, and
            take part in{" "}
            <span className="text-primary-foreground">governance</span>.
          </h1>
          <p className="text-xl text-primary-foreground/60">
            Share unused storage to earn.
          </p>
        </div>
      </div>
      <HostApplicationForm />
      <Footer />
    </>
  );
};

export default ProvideStoragePage;
