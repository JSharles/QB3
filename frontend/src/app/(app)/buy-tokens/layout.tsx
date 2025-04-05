import Header from "@/components/header/header";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="fixed inset-0 -z-10"></div>

      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      <div className="flex min-h-screen flex-col pt-[80px]">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
