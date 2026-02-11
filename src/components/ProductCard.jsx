import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card group">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-primary-600 shadow-sm">
          {product.category}
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <Link to={`/product/${product.id}`} className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
              {product.title}
            </h3>
          </Link>
          <div className="flex items-center text-yellow-400">
            <Star size={14} fill="currentColor" />
            <span className="ml-1 text-xs font-medium text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all active:scale-95 shadow-sm hover:shadow-md"
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
