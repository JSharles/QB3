import { Button } from "@/components/ui/button";
import Footer from "@/components/footer/footer";

export default function HomePage() {
  return (
    <>
      <div className="flex items-center justify-center text-center px-6 min-h-[calc(100vh-80px)]">
        <div className="max-w-md">
          <h1 className="text-4xl text-white md:text-5xl font-bold mb-4">
            A decentralized storage network.
          </h1>
        </div>
      </div>

      <Footer />
    </>
  );
}
