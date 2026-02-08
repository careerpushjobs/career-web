import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import GoogleAdSense from "@/components/GoogleAdSense";
import AdSenseUnit from "@/components/AdSenseUnit";
import AdGate from "@/components/AdGate";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Career Push",
  description: "Find the best freshers and entry-level jobs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50 text-gray-900 antialiased`}>
        <GoogleAdSense pId="ca-pub-6077598750200529" />

        {/* Ad Gate Overlay */}
        <AdGate client="ca-pub-6077598750200529" slot="4981025905" />

        <Header />

        {/* Layout Container */}
        <div className="flex flex-col xl:flex-row justify-center min-h-screen max-w-[1920px] mx-auto pt-8">

          {/* Left/Top Ad Region */}
          <aside className="w-full xl:w-[160px] xl:sticky xl:top-24 flex-shrink-0 mx-0 xl:mx-4 order-1 mb-8 xl:mb-0">
            <div className="flex justify-center min-h-[100px] xl:min-h-[600px] bg-gray-100/50 rounded-lg">
              <AdSenseUnit
                client="ca-pub-6077598750200529"
                slot="1252807538"
                format="auto"
                responsive={true}
                style={{ display: 'block', width: '100%' }}
              />
            </div>
          </aside>

          {/* Main Content - Flex Grow */}
          <main className="flex-1 w-full max-w-5xl px-4 pb-8 min-h-screen order-2">
            {children}
          </main>

          {/* Right/Bottom Ad Region */}
          <aside className="w-full xl:w-[160px] xl:sticky xl:top-24 flex-shrink-0 mx-0 xl:mx-4 order-3 mt-8 xl:mt-0">
            <div className="flex justify-center min-h-[100px] xl:min-h-[600px] bg-gray-100/50 rounded-lg">
              <AdSenseUnit
                client="ca-pub-6077598750200529"
                slot="9933135531"
                format="auto"
                responsive={true}
                style={{ display: 'block', width: '100%' }}
              />
            </div>
          </aside>

        </div>
      </body>
    </html>
  );
}
