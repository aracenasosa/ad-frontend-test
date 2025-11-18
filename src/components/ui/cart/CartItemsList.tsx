'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

export default function CartItemsList() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="w-full">
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="
              w-full
              bg-white rounded-lg border border-gray-300 p-4
              flex flex-col sm:flex-row
              gap-4 relative
            "
          >
            {/* Remove button */}
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

            {/* Image */}
            <div className="relative w-24 h-24 flex-shrink-0 mx-auto sm:mx-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded"
              />
              {item.isNew && (
                <span
                  className="absolute top-1 left-1 text-xs font-bold px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: '#F5F5F4', color: '#3B3B3B' }}
                >
                  New
                </span>
              )}
            </div>

            {/* Text + controls */}
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1 uppercase font-bold">
                  {item.genre}
                </p>
                <h3 className="text-base font-bold text-gray-800 mb-1 break-words">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-400 mb-2 break-words">
                  {item.description}
                </p>
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor={`quantity-${item.id}`}
                    className="text-sm text-gray-600"
                  >
                    Qty:
                  </label>
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
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
