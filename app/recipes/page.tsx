"use client";
import { useState, useRef } from 'react';

const FILTER_OPTIONS = [
  { key: 'name', label: 'Alphabetical Order' },
  { key: 'cookingTime', label: 'Cooking Time' },
];

export default function RecipesPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const barRef = useRef<HTMLDivElement>(null);

  function handleAddFilter(key: string) {
    if (!filters.includes(key)) setFilters([...filters, key]);
    setDropdownOpen(false);
  }

  function handleRemoveFilter(key: string) {
    setFilters(filters.filter(f => f !== key));
  }

  // Close dropdown if clicked outside
  // (for demo, not robust)
  // useEffect(() => {
  //   function handleClick(e: MouseEvent) {
  //     if (barRef.current && !barRef.current.contains(e.target as Node)) {
  //       setDropdownOpen(false);
  //     }
  //   }
  //   if (dropdownOpen) document.addEventListener('mousedown', handleClick);
  //   return () => document.removeEventListener('mousedown', handleClick);
  // }, [dropdownOpen]);

  return (
    <div className="bg-white min-h-screen w-full">
      <h1 className="text-3xl font-bold py-12 text-center">Recipes</h1>
      <div className="max-w-2xl mx-auto px-4">
        {/* Interactive search bar with filter dropdown and bubbles */}
        <div ref={barRef} className="relative flex items-center mb-8">
          <div
            className={
              `flex-1 flex items-center rounded-full border px-4 py-2 bg-white shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary ` +
              `hover:scale-[1.03] hover:shadow-lg focus-within:scale-[1.03] focus-within:shadow-lg`
            }
          >
            <input
              type="text"
              placeholder="Search recipes..."
              className="flex-1 bg-transparent outline-none text-base rounded-full"
            />
            {/* Filter bubbles */}
            <div className="flex space-x-2 ml-2">
              {filters.map(key => {
                const label = FILTER_OPTIONS.find(f => f.key === key)?.label || key;
                return (
                  <span key={key} className="flex items-center bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm">
                    <button
                      className="mr-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => handleRemoveFilter(key)}
                      aria-label={`Remove ${label} filter`}
                      type="button"
                    >
                      &times;
                    </button>
                    {label}
                  </span>
                );
              })}
            </div>
            {/* Down arrow */}
            <button
              type="button"
              className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={() => setDropdownOpen(v => !v)}
              aria-label="Show filter options"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
              {FILTER_OPTIONS.filter(f => !filters.includes(f.key)).map(opt => (
                <div
                  key={opt.key}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                  onClick={() => handleAddFilter(opt.key)}
                >
                  {opt.label}
                </div>
              ))}
              {filters.length === FILTER_OPTIONS.length && (
                <div className="px-4 py-2 text-gray-400">All filters added</div>
              )}
            </div>
          )}
        </div>
        {/* Recipe list will go here in the future */}
        <div className="text-center text-gray-400">No recipes to display yet.</div>
      </div>
    </div>
  );
} 