"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="dark:bg-primary-dark-950 border-secondary-light-400 sticky top-0 z-50 flex items-center justify-between border-b bg-white px-4 py-3 shadow-md dark:border-transparent">
      <Link
        href="/"
        className="text-accent-secondary-light-500 dark:text-accent-secondary-dark-100 flex flex-row items-center gap-2 text-xl font-bold tracking-wide"
        onClick={() => setOpen(false)}
      >
        <Image
          src="/logo.svg"
          alt="Logo"
          width={40}
          height={40}
          className="dark:bg-primary-dark-50 ring-secondary-light-400 ml-2 inline-block h-8 w-8 rounded-full bg-white shadow-md ring-1 dark:ring-transparent"
        />
        <span>CricShort</span>
      </Link>
      <nav
        className={`${
          open
            ? "dark:bg-primary-dark-950 border-secondary-light-400 absolute top-full left-0 flex w-full flex-col border-b bg-white py-4 shadow-lg sm:static sm:w-auto sm:flex-row sm:border-none sm:bg-transparent sm:py-0 sm:shadow-none dark:border-transparent"
            : "hidden sm:flex sm:flex-row"
        }`}
      >
        <Link
          href="/points"
          className="text-accent-secondary-light-500 dark:text-accent-secondary-dark-100 hover:bg-accent-secondary-light-50/10 dark:hover:bg-accent-secondary-dark-950/10 block rounded-full px-4 py-2 transition-colors"
          onClick={() => setOpen(false)}
        >
          Points
        </Link>
        <Link
          href="/matches"
          className="text-accent-secondary-light-500 dark:text-accent-secondary-dark-100 hover:bg-accent-secondary-light-50/10 dark:hover:bg-accent-secondary-dark-950/10 block rounded-full px-4 py-2 transition-colors"
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
            <span className="bg-accent-secondary-light-500 dark:bg-accent-secondary-dark-100 absolute h-0.5 w-7 rotate-45 rounded transition-all"></span>
            <span className="bg-accent-secondary-light-500 dark:bg-accent-secondary-dark-100 absolute h-0.5 w-7 -rotate-45 rounded transition-all"></span>
          </>
        ) : (
          <>
            <span className="bg-accent-secondary-light-500 dark:bg-accent-secondary-dark-100 h-0.5 w-7 rounded transition-all"></span>
            <span className="bg-accent-secondary-light-500 dark:bg-accent-secondary-dark-100 h-0.5 w-7 rounded transition-all"></span>
            <span className="bg-accent-secondary-light-500 dark:bg-accent-secondary-dark-100 h-0.5 w-7 rounded transition-all"></span>
          </>
        )}
      </button>
    </header>
  );
}
