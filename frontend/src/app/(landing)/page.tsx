import Footer from "@/components/footer/footer";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <div className="relative min-h-[calc(100vh-80px)] w-full">
        {/* Texte aligné à droite comme avant */}
        <div className="absolute bottom-[11.5rem] right-8 max-w-xl px-6 text-center">
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

        {/* Bouton centré horizontalement, même hauteur que le texte */}
        <div className="absolute bottom-[6.5rem] left-1/2 -translate-x-1/2">
          <Button
            asChild
            variant="ghost"
            className="bg-transparent border-none text-white text-xl px-8 py-4 rounded-2xl hover:bg-white/10 transition flex items-center gap-2"
          >
            <a
              href="https://hackmd.io/@EMgPpkbwTPCAiv1jWa6XPA/SJ-lCIlTkl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Explore the QB3 vision</span>
              <span>→</span>
            </a>
          </Button>
        </div>
      </div>

      <Footer />
    </>
  );
}
