import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthCustomer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AuthState {
  customer: AuthCustomer | null;
  isLoggedIn: boolean;
  login: (customer: AuthCustomer) => void;
  logout: () => void;
  updateCustomer: (updates: Partial<AuthCustomer>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      customer: null,
      isLoggedIn: false,
      login: (customer) => set({ customer, isLoggedIn: true }),
      logout: () => set({ customer: null, isLoggedIn: false }),
      updateCustomer: (updates) =>
        set((state) => ({
          customer: state.customer ? { ...state.customer, ...updates } : null,
        })),
    }),
    {
      name: 'balloonsmall-auth',
    }
  )
);
