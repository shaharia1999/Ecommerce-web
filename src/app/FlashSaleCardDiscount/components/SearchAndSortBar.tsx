'use client';
import { useState, useEffect } from 'react';

type Props = {
  params: any;
  onChange: (newParams: Partial<any>) => void;
};

const SearchAndSortBar = ({ params, onChange }: Props) => {
  const [searchInput, setSearchInput] = useState(params.search || '');

  useEffect(() => {
    setSearchInput(params.search || '');
  }, [params.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange({ search: searchInput.trim() });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === '-discountedPrice') {
      onChange({ sortBy: 'discountedPrice', sortOrder: 'desc' });
    } else if (value === 'discountedPrice') {
      onChange({ sortBy: 'discountedPrice', sortOrder: 'asc' });
    } else {
      onChange({ sortBy: 'createdAt', sortOrder: 'desc' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-between mb-4 gap-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="border p-2 rounded w-1/2"
      />
      <button
        type="submit"
        aria-label="Search"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        🔍
      </button>

      <select
        value={
          params.sortBy === 'discountedPrice'
            ? params.sortOrder === 'asc'
              ? 'discountedPrice'
              : '-discountedPrice'
            : 'createdAt'
        }
        onChange={handleSortChange}
        className="border p-2 rounded"
      >
        <option value="createdAt">Newest</option>
        <option value="discountedPrice">Price (Low to High)</option>
        <option value="-discountedPrice">Price (High to Low)</option>
      </select>
    </form>
  );
};

export default SearchAndSortBar;
