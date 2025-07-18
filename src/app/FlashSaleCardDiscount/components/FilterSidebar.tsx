'use client';

import { useState } from 'react';

type Props = {
  params: any;
  onChange: (newParams: Partial<any>) => void;
};

const FilterSidebar = ({ params, onChange }: Props) => {
  const [formData, setFormData] = useState({
    category: params.category || '',
    size: params.size || '',
    color: params.color || '',
    priceMin: params.priceMin || '',
    priceMax: params.priceMax || '',
    discount: params.discount || false,
  });

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Filter By</h3>

      <div>
        <label className="block text-sm">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">All</option>
          <option value="Trending">Trending</option>
          <option value="Fashion">Fashion</option>
          <option value="Sports">Sports</option>
          <option value="Electronics">Electronics</option>
          {/* Add more */}
        </select>
      </div>
{/* 
      <div>
        <label className="block text-sm">Size</label>
        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm">Color</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div> */}

      <div>
        <label className="block text-sm">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            name="priceMin"
            placeholder="Min"
            value={formData.priceMin}
            onChange={handleChange}
            className="w-1/2 border p-2 rounded"
          />
          <input
            type="number"
            name="priceMax"
            placeholder="Max"
            value={formData.priceMax}
            onChange={handleChange}
            className="w-1/2 border p-2 rounded"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="discount"
          checked={formData.discount}
          onChange={handleChange}
        />
        <label>Discounted Only</label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default FilterSidebar;
