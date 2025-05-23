import "~/styles/globals.css";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "CricShort",
  description: "Real-time IPL cricket match information",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Match Schedule</h1>
      <div className="min-h-screen bg-transparent">
        <div className="container mx-auto px-2 py-4 sm:px-4">{children}</div>
      </div>
    </div>
  );
}
