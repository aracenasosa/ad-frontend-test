'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import CartItemsList from '@/components/ui/CartItemsList';
import OrderSummary from '@/components/ui/OrderSummary';

export default function CartScreen() {
  const { cartItems, getTotalItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className='flex min-h-screen flex-col items-center justify-center p-24'>
        <h1 className='text-4xl font-bold text-gray-800 mb-8'>Your Cart</h1>
        <p className='text-gray-600 text-lg mb-8'>Your cart is empty</p>
        <Link
          href="/"
          className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700 transition-colors duration-200"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  const totalItems = getTotalItems();

  return (
    <main className='min-h-screen p-8 md:p-12 lg:p-24'>
      <div className="w-full max-w-[1400px] mx-auto">
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-6 inline-flex items-center gap-2"
        >
          <Image
            src="/arrow left.svg"
            alt="Arrow left"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          Back to Catalog
        </Link>

        <h1 className='text-4xl font-bold text-gray-800 mb-2'>Your Cart</h1>
        <p className='text-gray-600 mb-6'>{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <CartItemsList />
          <OrderSummary />
        </div>
      </div>
    </main>
  );
}
