import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md animate-slide-in-right">
          <div className="h-full flex flex-col bg-white shadow-2xl">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <ShoppingBag className="mr-2 text-primary-600" size={24} />
                  Shopping Cart ({totalItems})
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mt-8">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingBag size={64} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-500 font-medium text-lg">Your cart is empty</p>
                    <button 
                      onClick={onClose}
                      className="mt-4 text-primary-600 font-bold hover:underline"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {cart.map((item) => (
                      <li key={item.id} className="py-6 flex">
                        <div className="flex-shrink-0 w-24 h-24 border border-gray-100 rounded-xl overflow-hidden bg-gray-50">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-semibold text-gray-900 text-lg">
                              <h3 className="line-clamp-1">{item.title}</h3>
                              <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 capitalize">{item.category}</p>
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <div className="flex items-center space-x-2 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 text-gray-500 hover:text-primary-600 transition-colors"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="font-bold text-gray-900 w-6 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 text-gray-500 hover:text-primary-600 transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-100 py-6 px-4 sm:px-6 bg-gray-50">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                  <p>Subtotal</p>
                  <p className="text-2xl font-bold text-primary-600">${totalPrice.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                        onClose();
                        navigate('/cart');
                    }}
                    className="w-full btn btn-primary py-4 text-lg shadow-xl"
                  >
                    Go to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
