import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCcw, Loader2 } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
    };
    getProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-600" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary">Back to Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-primary-600 font-medium mb-8 transition-colors group"
      >
        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Results
      </button>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
            <img
              src={product.images[activeImage] || product.thumbnail}
              alt={product.title}
              className="w-full h-full object-contain p-8 animate-fade-in"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(0, 4).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === idx ? 'border-primary-600 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 lg:mt-0 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-bold capitalize">
                {product.category}
              </span>
              <span className="text-sm text-gray-500 font-medium">SKU: {product.sku || 'N/A'}</span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">{product.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                    className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
                  />
                ))}
                <span className="ml-2 text-lg font-bold text-gray-900">{product.rating}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-primary-600 font-medium">{product.stock} in stock</span>
            </div>
          </div>

          <div className="border-y border-gray-100 py-6">
            <div className="text-4xl font-bold text-gray-900 mb-2">${product.price.toFixed(2)}</div>
            <p className="text-gray-500 text-lg leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => addToCart(product)}
              className="w-full btn btn-primary py-4 text-lg flex items-center justify-center gap-3 shadow-xl"
            >
              <ShoppingCart size={24} />
              Add to Bag
            </button>
            
            <div className="grid grid-cols-3 gap-4 py-6">
              {[
                { icon: ShieldCheck, text: 'Secure Payment' },
                { icon: Truck, text: 'Free Delivery' },
                { icon: RefreshCcw, text: '14 Days Return' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2">
                  <div className="p-3 bg-gray-50 text-primary-600 rounded-xl">
                    <item.icon size={20} />
                  </div>
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-tighter">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
