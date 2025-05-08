import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";

import { TRPCReactProvider } from "~/trpc/react";

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
          <nav className="bg-indigo-600 p-4 text-white shadow-md">
            <div className="container mx-auto">
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <Link href="/" className="text-xl font-bold">
                  CricShort
                </Link>
                <div className="flex space-x-4">
                  <Link href="/schedule" className="hover:text-indigo-200">
                    Schedule
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          <main className="container mx-auto p-4">{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
