import React, { useState, useEffect, useMemo } from 'react';
import { fetchProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import SortDropdown from '../components/SortDropdown';
import { Loader2, Filter } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('default');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    getProducts();
  }, []);

  const categories = useMemo(() => {
    const cats = products.map((p) => p.category);
    return [...new Set(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price <= priceRange;
      const matchesRating = product.rating >= minRating;
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, searchQuery, selectedCategory, priceRange, minRating, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-600" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="flex-1 max-w-2xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Our Collections</h1>
          <p className="text-gray-500 text-lg">Discover our premium range of products curated just for you.</p>
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium"
            >
                <Filter size={20} />
                Filters
            </button>
            <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`md:w-64 space-y-8 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <Filters 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            minRating={minRating}
            onRatingChange={setMinRating}
          />
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="animate-slide-up">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-4">
                <Filter className="text-gray-300" size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query to find what you're looking for.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setPriceRange(2000);
                  setMinRating(0);
                }}
                className="mt-6 text-primary-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
