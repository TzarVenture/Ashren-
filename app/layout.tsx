import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { WeatherProvider } from "./components/weather-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Ashren | Haute Marketplace - Pocket 4K Gimbal Camera & Drone",
  description:
    "Ashren brings you premium gadgets for creators, travelers and everyday adventurers. Discover 4K Ultra HD cameras with 180° rotation and AI stabilization.",
  keywords: "Ashren,Camera,4K Gimbal,Vlog Camera,Drone,FPV Drone,Haute Marketplace",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#050608] text-white selection:bg-[#E5A93C] selection:text-black overflow-x-hidden font-sans">
        <WeatherProvider>
          {children}
        </WeatherProvider>
      </body>
    </html>
  );
}
