import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

export type CartItem = {
  id: string;
  nome: string;
  preco: string;
  unidades: string;
  image: any;
  desconto?: string;
  precoOriginal?: string;
  quantidade: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantidade'>, quantidade?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantidade: number) => void;
  clearCart: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, 'quantidade'>, quantidade = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((cartItem) => cartItem.id === item.id);

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantidade: updated[existingIndex].quantidade + quantidade,
        };
        return updated;
      }

      return [...prev, { ...item, quantidade }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((cartItem) => cartItem.id !== id));
  };

  const updateQuantity = (id: string, quantidade: number) => {
    setItems((prev) =>
      prev.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantidade: quantidade < 1 ? 1 : quantidade }
          : cartItem
      )
    );
  };

  const clearCart = () => setItems([]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems: items.reduce((acc, item) => acc + item.quantidade, 0),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

