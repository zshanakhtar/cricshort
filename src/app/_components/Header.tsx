"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-primary-light-900 dark:bg-primary-dark-900 sticky top-0 z-50 flex items-center justify-between px-4 py-3 shadow-md">
      <Link
        href="/"
        className="text-secondary-light-50 dark:text-secondary-dark-50 flex flex-row items-center gap-2 text-xl font-bold tracking-wide"
        onClick={() => setOpen(false)}
      >
        <Image
          src="/logo.svg"
          alt="Logo"
          width={40}
          height={40}
          className="bg-secondary-light-50 dark:text-secondary-dark-50 ml-2 inline-block h-8 w-8 rounded-full shadow"
        />
        <span>CricShort</span>
      </Link>
      <nav
        className={`${
          open
            ? "absolute top-full left-0 flex w-full flex-col bg-slate-900 py-4 shadow-lg sm:static sm:w-auto sm:flex-row sm:bg-transparent sm:py-0 sm:shadow-none"
            : "hidden sm:flex sm:flex-row"
        }`}
      >
        <Link
          href="/points"
          className="block rounded-full px-4 py-2 text-white hover:bg-slate-800 hover:text-indigo-300"
          onClick={() => setOpen(false)}
        >
          Points
        </Link>
        <Link
          href="/matches"
          className="block rounded-full px-4 py-2 text-white hover:bg-slate-800 hover:text-indigo-300"
          onClick={() => setOpen(false)}
        >
          Schedule
        </Link>
      </nav>
      <button
        className="relative flex h-8 w-7 flex-col items-center justify-center gap-1.5 sm:hidden"
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <>
            <span className="absolute h-0.5 w-7 rotate-45 rounded bg-white transition-all"></span>
            <span className="absolute h-0.5 w-7 -rotate-45 rounded bg-white transition-all"></span>
          </>
        ) : (
          <>
            <span className="h-0.5 w-7 rounded bg-white transition-all"></span>
            <span className="h-0.5 w-7 rounded bg-white transition-all"></span>
            <span className="h-0.5 w-7 rounded bg-white transition-all"></span>
          </>
        )}
      </button>
    </header>
  );
}
