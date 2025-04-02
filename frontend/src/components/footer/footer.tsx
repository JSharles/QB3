import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="text-primary-foreground px-8 py-16 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <p className="text-primary-foreground/80 leading-relaxed">
            QB3 is an open-source storage marketplace, protocol, and incentive
            layer.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Reach out</h4>
          <ul className="space-y-1 text-primary-foreground/60">
            <li>
              <a href="#" className="hover:text-primary-foreground">
                Telegram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-foreground">
                Discord
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Resources</h4>
          <ul className="space-y-1 text-primary-foreground/60">
            <li>
              <a href="#" className="hover:text-primary-foreground">
                Docs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-foreground">
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Sign up</h4>
          <div className="flex items-center border-b border-primary-foreground/20 pb-1">
            <Input
              type="email"
              placeholder="Your email"
              className="bg-transparent text-primary-foreground border-none focus:ring-0 placeholder:text-primary-foreground"
            />

            <button className="ml-2 text-xl hover:translate-x-1 transition-transform">
              →
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
