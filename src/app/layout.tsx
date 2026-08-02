import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hemanathan — Portfolio",
    template: "%s — Hemanathan",
  },
  description:
    "Interactive developer workspace and portfolio of Hemanathan: web development, GPU compute, and media automation.",
  authors: [{ name: "Hemanathan" }],
  creator: "Hemanathan",
  openGraph: {
    type: "website",
    title: "Hemanathan — Portfolio",
    description:
      "Interactive developer workspace and portfolio of Hemanathan: web development, GPU compute, and media automation.",
    siteName: "Hemanathan — Portfolio",
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
      <body>{children}</body>
    </html>
  );
}
