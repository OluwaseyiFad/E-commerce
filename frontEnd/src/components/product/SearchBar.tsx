import React, { useState, useCallback, useEffect } from "react";
import { sanitizeSearchQuery } from "@/utils/sanitize";
import debounce from "lodash.debounce";
import { SEARCH_DEBOUNCE_DELAY } from "@/utils/constants";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
}

/**
 * SearchBar Component - Allows users to search products by name or brand
 * Sanitizes search input to prevent XSS attacks
 * Debounces search input for better performance
 */
const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  resultCount,
}) => {
  // Local state for immediate UI updates
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Sync with prop changes (e.g., when parent resets search)
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const sanitized = sanitizeSearchQuery(value);
      onSearchChange(sanitized);
    }, SEARCH_DEBOUNCE_DELAY),
    [onSearchChange]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchInput = (value: string) => {
    // Update local state immediately for responsive UI
    setLocalQuery(value);
    // Debounce the actual search
    debouncedSearch(value);
  };

  return (
    <div className="mb-6">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={localQuery}
          onChange={(e) => handleSearchInput(e.target.value)}
          placeholder="Search products by name or brand..."
          className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        />
      </div>
      {searchQuery && (
        <p className="mt-2 text-sm text-gray-600">
          Found {resultCount} {resultCount === 1 ? "product" : "products"} matching "{searchQuery}"
        </p>
      )}
    </div>
  );
};

export default SearchBar;