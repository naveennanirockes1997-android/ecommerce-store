import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar onOpenCart={() => setIsCartOpen(true)} />
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <footer className="bg-white border-t border-gray-100 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-gray-400 font-medium">© 2026 LUXESTORE. All rights reserved.</p>
              <div className="flex justify-center gap-6 mt-4">
                <a href="#" className="text-gray-300 hover:text-primary-600 transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-300 hover:text-primary-600 transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-300 hover:text-primary-600 transition-colors">Contact Us</a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
