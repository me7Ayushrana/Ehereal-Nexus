import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import StarfieldBackground from "@/components/StarfieldBackground";
import AlienOverlay from "@/components/AlienOverlay";
import AlienGlyphs from "@/components/AlienGlyphs";
import MobileNotice from "@/components/MobileNotice";
// ...

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Ethereal Nexus | The Void Form",
  description: "A digital experience beyond reality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.variable,
          orbitron.variable,
          "antialiased bg-void text-foreground overflow-x-hidden selection:bg-neon-cyan/30 md:cursor-none"
        )}
      >
        <SmoothScroll>
          <MobileNotice />
          <CustomCursor />
          <AlienOverlay />
          <AlienGlyphs />
          <StarfieldBackground />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
