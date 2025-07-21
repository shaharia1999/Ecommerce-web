'use client';
import { useHandleBuyNow } from '@/src/utils/commonfunction';
import React, { useState, useEffect } from 'react';

interface ParamsType {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'desc';
  search: string;
  category: string;
  size: string;
  color: string;
  priceMin: string;
  priceMax: string;
  discount: boolean;
}

const SearchBar = ({
  data,
  setParams,
}: {
  data: any[];
  setParams: React.Dispatch<React.SetStateAction<ParamsType>>;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const handleBuyNow = useHandleBuyNow();
useEffect(() => {
  if (searchTerm.trim() !== '') {
    if (Array.isArray(data)) {
      const result = data.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(result);
    }
    setShowDrawer(true);
  } else {
    setFilteredData([]);
    setShowDrawer(false);
  }
}, [searchTerm, data]);

useEffect(() => {
  console.log('data:', data); // Check the value and type
}, [data]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Input value:', value);
    setSearchTerm(value);
    setParams(prev => ({ ...prev, search: value }));
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="flex">
        <input
          type="search"
          placeholder="I'm looking for..."
          value={searchTerm}
          onChange={handleInputChange}
          className="lg:px-3 lg:py-3 px-2 py-1 border border-gray-300 rounded-l-[30px] rounded-r-none w-full focus:outline-none"
        />
        <button
          className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-r-[30px] border border-l-0 border-gray-300 transition-colors"
        >
          Search
        </button>
      </div>

      {showDrawer && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 shadow-lg rounded-xl z-[1000] max-h-80 overflow-auto">
         {filteredData.map((item, idx) => (
  <div
    key={idx}
    className="flex items-center gap-4 px-4 py-3 border-b hover:bg-gray-100 cursor-pointer "
     onClick={() => {
      handleBuyNow({ title: item.title, slug: item.slug });
      setShowDrawer(false);
    }}>
    <div className="w-14 h-14 flex-shrink-0"
 
    >
      <img
        src={item.mainImg}
        alt={item.title}
        className="w-full h-full object-cover rounded"
      />
    </div>
    <div>
      <p className="font-medium text-gray-800">{item.title}</p>
      <p className="text-sm text-gray-500">৳{item.discountedPrice}</p>
    </div>
  </div>
))}

        </div>
      )}
    </div>
  );
};

export default SearchBar;
