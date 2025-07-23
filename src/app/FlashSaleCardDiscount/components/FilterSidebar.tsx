'use client';

import { useState } from 'react';

type FilterParams = {
  category: string;
  size: string;
  color: string;
  priceMin: string;
  priceMax: string;
  discount: boolean;
};
type Props = {
  params: Partial<FilterParams>;
  onChange: (newParams: Partial<FilterParams>) => void;
};


const FilterSidebar = ({ params, onChange }: Props) => {
 const [formData, setFormData] = useState<Partial<FilterParams>>({
  category: params.category || '',
  size: params.size || '',
  color: params.color || '',
  priceMin: params.priceMin || '',
  priceMax: params.priceMax || '',
  discount: params.discount || false,
});


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    const newValue =
      type === 'checkbox' && 'checked' in e.target
        ? (e.target as HTMLInputElement).checked
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-2xl shadow-md border-1 border-gray-200"
    >
      <h3 className="text-xl font-bold text-orange-500 border-b pb-2">🎯 Filter Products</h3>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">🗂 Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full bg-gray-100 text-gray-800 border-1 border-gray-100 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
        >
          <option value="">All</option>
          <option value="Trending">Trending</option>
          <option value="Fashion">Fashion</option>
          <option value="Sports">Sports</option>
          <option value="Electronics">Electronics</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">💰 Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            name="priceMin"
            placeholder="Min"
            value={formData.priceMin}
            onChange={handleChange}
            className="w-1/2 bg-gray-100 text-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none border-1 border-gray-100"
          />
          <input
            type="number"
            name="priceMax"
            placeholder="Max"
            value={formData.priceMax}
            onChange={handleChange}
            className="w-1/2 bg-gray-100 text-gray-800 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none border-1 border-gray-100"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="discount"
          checked={formData.discount}
          onChange={handleChange}
          className="accent-orange-500 w-4 h-4"
        />
        <label className="text-sm font-medium text-gray-700">🔥 Discounted Only</label>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
      >
        ✅ Apply Filters
      </button>
    </form>
  );
};

export default FilterSidebar;
