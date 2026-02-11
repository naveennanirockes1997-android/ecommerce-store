import React from 'react';

const Filters = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange 
}) => {
  return (
    <div className="space-y-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Category</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === 'all' 
              ? 'bg-primary-50 text-primary-600 font-semibold' 
              : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors capitalize ${
                selectedCategory === category 
                ? 'bg-primary-50 text-primary-600 font-semibold' 
                : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Max Price</h3>
          <span className="text-primary-600 font-bold">${priceRange}</span>
        </div>
        <input
          type="range"
          min="0"
          max="2000"
          step="50"
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>$0</span>
          <span>$2000</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Minimum Rating</h3>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onRatingChange(star)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                minRating >= star 
                ? 'bg-primary-600 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {star}
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={() => {
          onCategoryChange('all');
          onPriceChange(2000);
          onRatingChange(0);
        }}
        className="w-full py-2 text-sm font-medium text-gray-500 hover:text-primary-600 border-t border-gray-100 mt-4 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
