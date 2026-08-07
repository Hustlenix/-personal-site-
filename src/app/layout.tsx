import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Hemanathan — Developer",
    template: "%s — Hemanathan",
  },
  description:
    "Interactive developer workspace and portfolio of Hemanathan: web development, GPU compute, and media automation.",
  authors: [{ name: "Hemanathan" }],
  creator: "Hemanathan",
  openGraph: {
    type: "website",
    title: "Hemanathan — Developer",
    description:
      "Interactive developer workspace and portfolio of Hemanathan: web development, GPU compute, and media automation.",
    siteName: "Hemanathan — Developer",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0f14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plexSans.variable} ${jetBrainsMono.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
