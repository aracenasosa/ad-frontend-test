import { render, screen, fireEvent } from '@testing-library/react';
import AddToCartButton from '../AddToCartButton';
import { CartProvider } from '@/contexts/CartContext';
import { Game } from '@/utils/endpoint';

const mockGame: Game = {
  id: '1',
  name: 'Test Game',
  price: 29.99,
  genre: 'Action',
  image: '/test-image.jpg',
  description: 'Test description',
  isNew: false,
};

const renderWithProvider = (game: Game) => {
  return render(
    <CartProvider>
      <AddToCartButton game={game} />
    </CartProvider>
  );
};

describe('AddToCartButton', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders "ADD TO CART" when item is not in cart', () => {
    renderWithProvider(mockGame);
    expect(screen.getByText('ADD TO CART')).toBeDefined();
  });

  it('renders "REMOVE" when item is in cart', () => {
    renderWithProvider(mockGame);
    const button = screen.getByText('ADD TO CART');
    fireEvent.click(button);
    expect(screen.getByText('REMOVE')).toBeDefined();
  });

  it('adds item to cart when clicked and not in cart', () => {
    renderWithProvider(mockGame);
    const button = screen.getByText('ADD TO CART');
    fireEvent.click(button);
    expect(screen.getByText('REMOVE')).toBeDefined();
  });

  it('removes item from cart when clicked and in cart', () => {
    renderWithProvider(mockGame);
    const button = screen.getByText('ADD TO CART');
    fireEvent.click(button);
    expect(screen.getByText('REMOVE')).toBeDefined();
    fireEvent.click(screen.getByText('REMOVE'));
    expect(screen.getByText('ADD TO CART')).toBeDefined();
  });
});

