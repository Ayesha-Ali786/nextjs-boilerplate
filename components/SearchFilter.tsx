'use client';

import { Room } from '@/types';

interface SearchFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  minCapacity: string;
  acFilter: string;
  washroomFilter: string;
}

export default function SearchFilter({ onFilterChange }: SearchFilterProps) {
  const handleChange = (field: keyof FilterState, value: string) => {
    onFilterChange({
      minCapacity: field === 'minCapacity' ? value : '',
      acFilter: field === 'acFilter' ? value : 'any',
      washroomFilter: field === 'washroomFilter' ? value : 'any',
    });
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Search & Filter</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="minCapacity" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Minimum Capacity
          </label>
          <input
            type="number"
            id="minCapacity"
            onChange={(e) => handleChange('minCapacity', e.target.value)}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:text-white"
            placeholder="e.g., 2"
            min="1"
          />
        </div>

        <div>
          <label htmlFor="acFilter" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Air Conditioning
          </label>
          <select
            id="acFilter"
            onChange={(e) => handleChange('acFilter', e.target.value)}
            defaultValue="any"
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:text-white"
          >
            <option value="any">Any</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label htmlFor="washroomFilter" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Attached Washroom
          </label>
          <select
            id="washroomFilter"
            onChange={(e) => handleChange('washroomFilter', e.target.value)}
            defaultValue="any"
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:text-white"
          >
            <option value="any">Any</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
    </section>
  );
}
