import type { Metadata } from "next";
import { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { fontSans } from "@/config/fonts";
import { NextUINavbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peace Corps Student Evaluations",
  description: "Written by Liz Satynska, under MIT license",
};

export const viewport: Viewport = {
  themeColor: [
    // { media: "(prefers-color-scheme: dark)", color: "black" },
    { media: "(prefers-color-scheme: light)", color: "white" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth();
  
  return (
    <html
      lang="en"
      style={{ colorScheme: 'light' }}
      className={`${fontSans.variable} light`}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg h-screen`}
      >
        <Providers>
        <NextUINavbar/>
          <main className="container mx-auto max-w-7xl px-3 py-10 md:py-10 md:px-10 flex-grow items-center justify-center relative flex flex-col">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
