import * as React from "react";

export const CartContext = React.createContext<CartContextType | null>(null);

const CartProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [cart, setCart] = React.useState<ICartItem[]>([]);

  const addToCart = (itemToAdd: ICartItem) => {
    setCart([...cart, itemToAdd]);
  };

  const removeFromCart = (itemToRemove: ICartItem) => {
    const updatedCart = cart.filter(
      (cartItem: ICartItem) => cartItem.shopItem.id !== itemToRemove.shopItem.id
    );

    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
