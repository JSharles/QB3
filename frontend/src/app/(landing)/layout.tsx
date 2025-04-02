import Image from "next/image";
import Header from "@/components/header/header";
import HeaderLanding from "@/components/header-landing/header-landing";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/background.webp"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="fixed top-0 left-0 w-full z-50">
        <HeaderLanding />
      </div>

      <div className="flex min-h-screen flex-col pt-[80px]">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
