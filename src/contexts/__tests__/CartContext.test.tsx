import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';
import { Game } from '@/utils/endpoint';

const mockGame1: Game = {
  id: '1',
  name: 'Test Game 1',
  price: 29.99,
  genre: 'Action',
  image: '/test-image1.jpg',
  description: 'Test description 1',
  isNew: false,
};

const mockGame2: Game = {
  id: '2',
  name: 'Test Game 2',
  price: 39.99,
  genre: 'Adventure',
  image: '/test-image2.jpg',
  description: 'Test description 2',
  isNew: true,
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.getTotalItems()).toBe(0);
    expect(result.current.getTotalPrice()).toBe(0);
  });

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(mockGame1);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].id).toBe('1');
    expect(result.current.cartItems[0].quantity).toBe(1);
  });

  it('increments quantity when adding same item twice', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(mockGame1);
      result.current.addToCart(mockGame1);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(mockGame1);
      result.current.removeFromCart('1');
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it('updates item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(mockGame1);
      result.current.updateQuantity('1', 3);
    });

    expect(result.current.cartItems[0].quantity).toBe(3);
  });

  it('removes item when quantity is set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(mockGame1);
      result.current.updateQuantity('1', 0);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it('calculates total items correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(mockGame1);
      result.current.addToCart(mockGame2);
      result.current.updateQuantity('1', 2);
    });

    expect(result.current.getTotalItems()).toBe(3);
  });

  it('calculates total price correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(mockGame1);
      result.current.addToCart(mockGame2);
      result.current.updateQuantity('1', 2);
    });

    const expectedTotal = (29.99 * 2) + (39.99 * 1);
    expect(result.current.getTotalPrice()).toBeCloseTo(expectedTotal, 2);
  });

  it('clears cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart(mockGame1);
      result.current.addToCart(mockGame2);
      result.current.clearCart();
    });

    expect(result.current.cartItems).toHaveLength(0);
  });
});

