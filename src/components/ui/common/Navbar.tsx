'use client';

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { cartItems } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className='w-full flex justify-between items-center p-4 bg-gray-200'>
      <Link href="/" className="text-gray-700 font-sans text-lg">
          GamerShop
      </Link>
      <Link href="/cart" className="text-gray-700 relative">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" 
            />
          </svg>
          {isMounted && itemCount > 0 && (
            <span 
              className="absolute -top-2 -right-2 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1"
              style={{ backgroundColor: '#585660' }}
            >
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
      </Link>
    </nav>
  )
}

