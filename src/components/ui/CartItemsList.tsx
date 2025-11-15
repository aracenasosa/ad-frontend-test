'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

export default function CartItemsList() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex-[1.4] w-full">
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-gray-300 p-4 flex gap-4 relative"
          >
            <button
              onClick={() => removeFromCart(item.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
              aria-label={`Remove ${item.name} from cart`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded"
              />
            </div>
            
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1 uppercase font-bold">{item.genre}</p>
                <h3 className="text-base font-bold text-gray-800 mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-400 mb-2">{item.description}</p>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <label htmlFor={`quantity-${item.id}`} className="text-sm text-gray-600">
                    Qty:
                  </label>
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                  />
                </div>
                <p className="text-base font-bold text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

