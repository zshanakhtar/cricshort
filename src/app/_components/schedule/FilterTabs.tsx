import Link from "next/link";

interface FilterTabsProps {
  currentFilter: string | null;
}

export const FilterTabs = ({ currentFilter }: FilterTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/matches"
        className={`rounded-full px-4 py-2 text-sm transition-colors ${
          currentFilter === "all"
            ? "bg-accent-primary-light-600 dark:bg-accent-primary-dark-600"
            : "text-accent-primary-light-600 dark:text-accent-primary-dark-100 bg-transparent hover:bg-gray-50"
        }`}
      >
        All Matches
      </Link>
      <Link
        href="/matches/upcoming"
        className={`rounded-full px-4 py-2 text-sm transition-colors ${
          currentFilter === "upcoming"
            ? "bg-accent-primary-light-600 dark:bg-accent-primary-dark-600"
            : "text-accent-primary-light-600 dark:text-accent-primary-dark-100 bg-transparent hover:bg-gray-50"
        }`}
      >
        Upcoming
      </Link>
      <Link
        href="/matches/completed"
        className={`rounded-full px-4 py-2 text-sm transition-colors ${
          currentFilter === "completed"
            ? "bg-accent-primary-light-600 dark:bg-accent-primary-dark-600"
            : "text-accent-primary-light-600 dark:text-accent-primary-dark-100 bg-transparent hover:bg-gray-50"
        }`}
      >
        Completed
      </Link>
    </div>
  );
};
