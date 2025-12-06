import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

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
  description: "Mission Control for the ultimate ice cream drop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pressStart.variable} ${vt323.variable} bg-snes-black text-white antialiased overflow-hidden h-screen w-screen`}>
        <div className="relative w-full h-full">
            {/* CRT Overlay */}
            <div className="absolute inset-0 pointer-events-none z-50 crt opacity-50 mix-blend-overlay"></div>
            {/* Main Content */}
            <main className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
              {children}
            </main>
        </div>
      </body>
    </html>
  );
}

