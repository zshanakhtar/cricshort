import Link from "next/link";

interface FilterTabsProps {
  currentFilter: string | null;
}

export const FilterTabs = ({ currentFilter }: FilterTabsProps) => {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <Link
        href="/matches"
        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
          currentFilter === "all"
            ? "bg-accent-secondary-light-500 dark:bg-accent-secondary-dark-500 border-transparent text-white"
            : "text-accent-secondary-light-500 dark:text-accent-secondary-dark-500 border-accent-secondary-light-500 dark:border-accent-secondary-dark-500 hover:bg-accent-secondary-light-500/10 dark:hover:bg-accent-secondary-dark-500/10 bg-transparent"
        }`}
      >
        All Matches
      </Link>
      <Link
        href="/matches/upcoming"
        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
          currentFilter === "upcoming"
            ? "bg-accent-secondary-light-500 dark:bg-accent-secondary-dark-500 border-transparent text-white"
            : "text-accent-secondary-light-500 dark:text-accent-secondary-dark-500 border-accent-secondary-light-500 dark:border-accent-secondary-dark-500 hover:bg-accent-secondary-light-500/10 dark:hover:bg-accent-secondary-dark-500/10 bg-transparent"
        }`}
      >
        Upcoming
      </Link>
      <Link
        href="/matches/completed"
        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
          currentFilter === "completed"
            ? "bg-accent-secondary-light-500 dark:bg-accent-secondary-dark-500 border-transparent text-white"
            : "text-accent-secondary-light-500 dark:text-accent-secondary-dark-500 border-accent-secondary-light-500 dark:border-accent-secondary-dark-500 hover:bg-accent-secondary-light-500/10 dark:hover:bg-accent-secondary-dark-500/10 bg-transparent"
        }`}
      >
        Completed
      </Link>
    </div>
  );
};
