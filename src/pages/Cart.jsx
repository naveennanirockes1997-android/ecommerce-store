import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={48} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-500 text-lg mb-8">Looks like you haven't added anything to your cart yet. Explore our latest collections and find something you love!</p>
          <Link to="/" className="btn btn-primary px-8 py-3 text-lg inline-flex items-center gap-2">
            <ArrowLeft size={20} />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10">Shopping Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-8 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow">
              <div className="w-full sm:w-40 aspect-square rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-500 capitalize">{item.category}</p>
                  </div>
                  <p className="text-xl font-bold text-primary-600">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded-xl">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-600 hover:text-primary-600 hover:border-primary-200 transition-all shadow-xs"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="font-bold text-gray-900 w-8 text-center text-lg">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-600 hover:text-primary-600 hover:border-primary-200 transition-all shadow-xs"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-2 text-gray-400 hover:text-red-500 font-medium transition-colors"
                  >
                    <Trash2 size={20} />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-16 lg:mt-0 lg:col-span-4 lg:sticky lg:top-24">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4 border-b border-gray-100 pb-6 mb-6">
              <div className="flex justify-between text-gray-600 text-lg">
                <p>Items ({totalItems})</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-gray-600 text-lg">
                <p>Shipping</p>
                <p className="text-green-600 font-bold">Free</p>
              </div>
              <div className="flex justify-between text-gray-600 text-lg">
                <p>Taxes</p>
                <p>$0.00</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-8">
              <p className="text-xl font-bold text-gray-900">Total Amount</p>
              <p className="text-3xl font-extrabold text-primary-600">${totalPrice.toFixed(2)}</p>
            </div>
            <button className="w-full btn btn-primary py-4 text-xl flex items-center justify-center gap-3">
              Proceed to Payment
              <ArrowRight size={24} />
            </button>
            <p className="mt-4 text-center text-gray-400 text-sm">
              Secure checkout guaranteed. No card information stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
