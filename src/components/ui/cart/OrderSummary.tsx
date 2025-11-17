'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { MAX_ITEMS_TO_SHOW } from '@/config/constants';

export default function OrderSummary() {
  const { cartItems, getTotalPrice, getTotalItems } = useCart();
  const [showAllItems, setShowAllItems] = useState(false);
  
  const totalItems = getTotalItems();
  const shouldShowToggle = cartItems.length > MAX_ITEMS_TO_SHOW;
  const displayedItems = shouldShowToggle && !showAllItems 
    ? cartItems.slice(0, MAX_ITEMS_TO_SHOW)
    : cartItems;

  return (
    <div className="lg:w-[450px] flex-shrink-0 w-full lg:sticky lg:top-8 lg:self-start">
      <div className="bg-white rounded-lg border border-gray-300 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Order Summary</h2>
        <p className="text-sm text-gray-600 mb-6">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
        
        <div className="space-y-3 mb-6">
          {displayedItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-gray-800">
              <span>
                {item.name} <span className="text-gray-500">({item.quantity}x)</span>
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          {shouldShowToggle && (
            <button
              onClick={() => setShowAllItems(!showAllItems)}
              className="text-sm font-bold cursor-pointer checkout-link"
            >
              {showAllItems ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
        
        <div className="flex justify-between items-center mb-6 pt-6 border-t border-gray-300">
          <span className="text-lg font-bold text-gray-800">Order Total</span>
          <span className="text-lg font-bold text-gray-800">
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>
        
        <button 
          className="w-full text-white py-4 rounded cursor-pointer checkout-button"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

