'use client';
import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5"; // Clear icon

type Params = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  search: string;
  category: string;
  size: string;
  color: string;
  priceMin: string;
  priceMax: string;
  discount: boolean;
};

type Props = {
  params: Params;
  onChange: (newParams: Partial<Params>) => void;
};

const SearchAndSortBar = ({ params, onChange }: Props) => {
  const [searchInput, setSearchInput] = useState(params.search || '');

  // Sync input when parent params change
  useEffect(() => {
    setSearchInput(params.search || '');
  }, [params.search]);

  // Debounce search input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchInput.trim() !== params.search) {
        onChange({ search: searchInput.trim() });
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchInput]);

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

  const clearSearch = () => {
    setSearchInput('');
    onChange({ search: '' });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex items-center justify-between mb-4 gap-4 flex-wrap">
      <div className="flex items-center gap-2 md:w-1/2 justify-between relative w-full">
   
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full border border-gray-300 rounded shadow-sm p-2 pr-10"
        />
        {searchInput && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute md:right-20 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <IoCloseCircle size={20} />
          </button>
        )}
           <button
          type="submit"
          aria-label="Search"
          className="bg-orange-500 text-white px-4 py-[11px] rounded hover:bg-orange-700"
        >
          <IoSearch className="text-xl" />
        </button>
      </div>
      

      <select
        value={
          params.sortBy === 'discountedPrice'
            ? params.sortOrder === 'asc'
              ? 'discountedPrice'
              : '-discountedPrice'
            : 'createdAt'
        }
        onChange={handleSortChange}
        className="border border-gray-300 shadow p-2 rounded"
      >
        <option value="createdAt">Newest</option>
        <option value="discountedPrice">Price (Low to High)</option>
        <option value="-discountedPrice">Price (High to Low)</option>
      </select>
    </form>
  );
};

export default SearchAndSortBar;
