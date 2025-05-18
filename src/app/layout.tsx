import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Header } from "./_components/Header";

export const metadata: Metadata = {
  title: "CricShort",
  description: "Real-time IPL cricket match information",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="bg-primary-light-950 dark:bg-primary-dark-600 text-secondary-light-50 dark:text-secondary-dark-50 flex min-h-screen flex-col">
        <TRPCReactProvider>
          <Header />
          <main className="container mx-auto max-h-full flex-1 overflow-scroll p-4">
            {children}
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
