import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-[#2b5ee7] text-white px-8 py-16 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <p className="text-white/80 leading-relaxed">
            QB3 is an open-source storage marketplace, protocol, and incentive
            layer.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Reach out</h4>
          <ul className="space-y-1 text-white/60">
            <li>
              <a href="#" className="hover:text-white">
                Forum
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Telegram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Discord
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Resources</h4>
          <ul className="space-y-1 text-white/60">
            <li>
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Docs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Sign up</h4>
          <div className="flex items-center border-b border-white/20 pb-1">
            <Input
              type="email"
              placeholder="Your email"
              className="bg-transparent text-white border-none focus:ring-0 placeholder:text-white/40"
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
