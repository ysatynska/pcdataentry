import "@/styles/globals.css";
import { Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { auth } from "@/app/auth";
import { fontSans } from "@/config/fonts";
// import { Navbar } from "@/components/navbar";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "black" },
    { media: "(prefers-color-scheme: light)", color: "white" },
  ],
};

function appendDropdownItems(sport: any) {
  return [
    
  ];
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Roanoke College" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col">
            {/* <Navbar
              session={session}
              primaryLinks={primarySports}
              secondaryLinks={secondarySports}
            /> */}
            <div className="relative flex flex-col">
              <main className="container mx-auto max-w-7xl px-3 py-10 md:py-10 md:px-10 flex-grow">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
