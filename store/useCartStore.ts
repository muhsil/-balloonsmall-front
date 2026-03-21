import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  customText?: string;
  customColor?: string;
}

interface CartState {
  items: CartItem[];
  deliveryDate: string | null;
  deliveryTime: string | null;
  addToCart: (item: CartItem) => void;
  setDelivery: (date: string, time: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      deliveryDate: null,
      deliveryTime: null,
      addToCart: (item) => set((state) => {
        const existing = state.items.find((i) => i.id === item.id);
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          };
        }
        return { items: [...state.items, item] };
      }),
      setDelivery: (date, time) => set({ deliveryDate: date, deliveryTime: time }),
      clearCart: () => set({ items: [], deliveryDate: null, deliveryTime: null }),
    }),
    { name: 'balloonsmall-cart' }
  )
);
