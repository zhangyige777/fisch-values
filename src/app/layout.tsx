import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

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
    default: "Fisch Values Calculator",
    template: "%s | Fisch Tools"
  },
  description: "Complete Fisch database with fish values, calculator, codes, and tier list. Optimize your fishing strategy with our advanced tools.",
  keywords: ["fisch", "roblox fisch", "fisch calculator", "fisch values", "fisch codes"],
  authors: [{ name: "Fisch Values Team" }],
  creator: "Fisch Values",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fischvalues.online",
    siteName: "Fisch Values Calculator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900 text-white`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
