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
    default: "Lalith — Developer",
    template: "%s — Lalith",
  },
  description:
    "Interactive developer workspace and portfolio of Lalith: a student who refuses to stop building.",
  authors: [{ name: "Lalith" }],
  creator: "Lalith",
  openGraph: {
    type: "website",
    title: "Lalith — Developer",
    description:
      "Interactive developer workspace and portfolio of Lalith: a student who refuses to stop building.",
    siteName: "Lalith — Developer",
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
