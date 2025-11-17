'use client';

import { useCart } from '@/contexts/CartContext';
import { Game } from '@/utils/endpoint';

interface AddToCartButtonProps {
  game: Game;
}

export default function AddToCartButton({ game }: AddToCartButtonProps) {
  const { cartItems, addToCart, removeFromCart } = useCart();
  
  const isInCart = cartItems.some((item) => item.id === game.id);

  const handleClick = () => {
    if (isInCart) {
      removeFromCart(game.id);
    } else {
      addToCart(game);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="mt-auto w-full bg-transparent border-2 border-gray-800 text-gray-800 uppercase text-sm font-semibold py-3 rounded hover:bg-gray-800 hover:text-white transition-colors duration-200 cursor-pointer"
    >
      {isInCart ? 'REMOVE' : 'ADD TO CART'}
    </button>
  );
}

