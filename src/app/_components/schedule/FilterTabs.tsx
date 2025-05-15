type FilterType = "all" | "upcoming" | "completed";

interface FilterTabsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FilterTabs = ({
  currentFilter,
  onFilterChange,
}: FilterTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onFilterChange("all")}
        className={`rounded-full px-4 py-2 text-sm transition-colors ${
          currentFilter === "all"
            ? "bg-indigo-600 text-white"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        All Matches
      </button>
      <button
        onClick={() => onFilterChange("upcoming")}
        className={`rounded-full px-4 py-2 text-sm transition-colors ${
          currentFilter === "upcoming"
            ? "bg-indigo-600 text-white"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        Upcoming
      </button>
      <button
        onClick={() => onFilterChange("completed")}
        className={`rounded-full px-4 py-2 text-sm transition-colors ${
          currentFilter === "completed"
            ? "bg-indigo-600 text-white"
            : "bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        Completed
      </button>
    </div>
  );
};
