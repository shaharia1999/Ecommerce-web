'use client';
import { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
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
    <form onSubmit={handleSubmit} className="flex items-center justify-between mb-4 gap-4 flex-wrap">
      <div className='flex items-center gap-2 md:w-1/2   justify-between'>
        <div className=' w-full'>
          <input
        type="text"
        placeholder="Search products..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full border-1 border-gray-300 rounded shadow-sm p-2"
      />
        </div>
      <div className=''>
        <button
        type="submit"
        aria-label="Search"
        className="bg-orange-500 text-white px-4 py-[11px] rounded hover:bg-orange-700"
      >
        <IoSearch  className="text-xl"/>
      </button>
      </div>
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
        className="border-1 border-gray-300 shadow p-2 rounded"
      >
        <option value="createdAt">Newest</option>
        <option value="discountedPrice">Price (Low to High)</option>
        <option value="-discountedPrice">Price (High to Low)</option>
      </select>
      
    </form>
  );
};

export default SearchAndSortBar;
