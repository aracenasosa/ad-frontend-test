import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OrderSummary from '../OrderSummary';
import { CartProvider, useCart } from '@/contexts/CartContext';
import { Game } from '@/utils/endpoint';
import { MAX_ITEMS_TO_SHOW } from '@/config/constants';

const createMockGame = (id: string, name: string, price: number): Game => ({
  id,
  name,
  price,
  genre: 'Action',
  image: `/test-${id}.jpg`,
  description: `Description for ${name}`,
  isNew: false,
});

const TestComponent = ({ games }: { games: Game[] }) => {
  const { addToCart } = useCart();
  
  React.useEffect(() => {
    games.forEach(game => addToCart(game));
  }, []);

  return <OrderSummary />;
};

describe('OrderSummary', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('displays empty cart message when cart is empty', () => {
    render(
      <CartProvider>
        <OrderSummary />
      </CartProvider>
    );
    expect(screen.getByText('Order Summary')).toBeDefined();
    expect(screen.getByText('0 items')).toBeDefined();
  });

  it('displays cart items correctly', async () => {
    render(
      <CartProvider>
        <TestComponent games={[createMockGame('1', 'Game 1', 29.99)]} />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Game 1/i)).toBeDefined();
    });
  });

  it('shows "Show more" button when items exceed MAX_ITEMS_TO_SHOW', async () => {
    const games = Array.from({ length: MAX_ITEMS_TO_SHOW + 1 }, (_, i) =>
      createMockGame(`game-${i}`, `Game ${i}`, 29.99)
    );

    render(
      <CartProvider>
        <TestComponent games={games} />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Show more')).toBeDefined();
    });
  });

  it('toggles between "Show more" and "Show less"', async () => {
    const games = Array.from({ length: MAX_ITEMS_TO_SHOW + 1 }, (_, i) =>
      createMockGame(`game-${i}`, `Game ${i}`, 29.99)
    );

    render(
      <CartProvider>
        <TestComponent games={games} />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Show more')).toBeDefined();
    });

    const showMoreButton = screen.getByText('Show more');
    fireEvent.click(showMoreButton);
    
    await waitFor(() => {
      expect(screen.getByText('Show less')).toBeDefined();
    });

    fireEvent.click(screen.getByText('Show less'));
    
    await waitFor(() => {
      expect(screen.getByText('Show more')).toBeDefined();
    });
  });

  it('displays correct total price', async () => {
    render(
      <CartProvider>
        <TestComponent games={[
          createMockGame('1', 'Game 1', 29.99),
          createMockGame('2', 'Game 2', 39.99)
        ]} />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('$69.98')).toBeDefined();
    });
  });
});

