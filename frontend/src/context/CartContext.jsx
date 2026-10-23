import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  const addToCart = (product, qty) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    let newCartItems;

    if (existItem) {
      newCartItems = cartItems.map((x) =>
        x._id === existItem._id ? { ...product, qty } : x
      );
      toast.success('Cart updated!');
    } else {
      newCartItems = [...cartItems, { ...product, qty }];
      toast.success('Item added to cart!');
    }

    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const removeFromCart = (id) => {
    const newCartItems = cartItems.filter((x) => x._id !== id);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    toast.error('Item removed from cart');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};