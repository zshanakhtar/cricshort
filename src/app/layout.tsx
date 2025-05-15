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
      <body className="min-h-screen bg-gray-100">
        <TRPCReactProvider>
          <Header />
          <main className="container mx-auto p-4">{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
