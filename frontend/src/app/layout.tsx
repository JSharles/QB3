import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        <div className="fixed inset-0 -z-10">
          <Image
            src="/images/background.webp"
            alt="Background"
            fill
            priority
            className="object-cover"
          />
        </div>

        <Providers>
          <div className="fixed top-0 left-0 w-full z-50">
            <Header />
          </div>

          <div className="flex min-h-screen flex-col pt-[80px]">
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
