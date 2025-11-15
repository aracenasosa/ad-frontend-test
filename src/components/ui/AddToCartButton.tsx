'use client';

import { useCart } from '@/contexts/CartContext';
import { Game } from '@/utils/endpoint';

interface AddToCartButtonProps {
  game: Game;
}

export default function AddToCartButton({ game }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(game);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-auto w-full bg-transparent border-2 border-gray-800 text-gray-800 uppercase text-sm font-semibold py-3 rounded hover:bg-gray-800 hover:text-white transition-colors duration-200 cursor-pointer"
    >
      ADD TO CART
    </button>
  );
}

