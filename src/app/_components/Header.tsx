"use client";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-slate-900 px-4 py-3 shadow-md">
      <div className="text-xl font-bold tracking-wide text-white">
        CricShort
      </div>
      <nav
        className={`${
          open
            ? "absolute top-full left-0 flex w-full flex-col bg-slate-900 py-4 shadow-lg sm:static sm:w-auto sm:flex-row sm:bg-transparent sm:py-0 sm:shadow-none"
            : "hidden sm:flex sm:flex-row"
        }`}
      >
        <Link
          href="/points"
          className="block rounded-full px-4 py-2 text-white hover:text-indigo-300 hover:bg-slate-800"
          onClick={() => setOpen(false)}
        >
          Points
        </Link>
        <Link
          href="/schedule"
          className="block rounded-full px-4 py-2 text-white hover:text-indigo-300 hover:bg-slate-800"
          onClick={() => setOpen(false)}
        >
          Schedule
        </Link>
      </nav>
      <button
        className="flex flex-col items-center justify-center gap-1.5 sm:hidden"
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="h-0.5 w-7 rounded bg-white transition-all"></span>
        <span className="h-0.5 w-7 rounded bg-white transition-all"></span>
        <span className="h-0.5 w-7 rounded bg-white transition-all"></span>
      </button>
    </header>
  );
}
