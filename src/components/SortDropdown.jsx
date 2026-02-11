import React from 'react';
import { ChevronDown } from 'lucide-react';

const SortDropdown = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium text-gray-700 cursor-pointer w-full md:w-auto"
      >
        <option value="default">Sort by: Default</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
        <ChevronDown size={18} />
      </div>
    </div>
  );
};

export default SortDropdown;
