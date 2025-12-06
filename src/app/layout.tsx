import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import LayoutContent from "@/components/LayoutContent";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Space City Scoops",
  description: "Premium Freeze-Dried Ice Cream",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pressStart.variable} ${vt323.variable} bg-snes-black text-white antialiased min-h-screen`}>
        <ShopProvider>
          <div className="relative w-full min-h-screen">
              {/* CRT Overlay */}
              <div className="fixed inset-0 pointer-events-none z-50 crt opacity-50 mix-blend-overlay"></div>
              {/* Main Content */}
              <main className="relative z-10">
                <LayoutContent>
                  {children}
                </LayoutContent>
              </main>
          </div>
        </ShopProvider>
      </body>
    </html>
  );
}
