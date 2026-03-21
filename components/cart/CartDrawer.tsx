"use client";
import { useCartStore } from '@/store/useCartStore';
import { toast } from '@/components/ui/Toast';
import Link from 'next/link';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity } = useCartStore();
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleRemove = (id: number, name: string) => {
    removeFromCart(id);
    toast(`"${name}" removed from cart`, 'info');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[90] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[100] shadow-2xl flex flex-col
        transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-xl font-extrabold text-gray-900">🛒 Your Cart <span className="text-violet-600">({items.length})</span></h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎈</div>
              <p className="text-gray-500 font-medium">Your cart is empty!</p>
              <button onClick={onClose} className="mt-4 text-violet-600 font-semibold text-sm hover:underline">
                Continue Shopping →
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 py-4 border-b border-gray-50">
                <div className="w-16 h-16 rounded-xl bg-violet-50 flex items-center justify-center text-3xl flex-shrink-0">
                  🎈
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate">{item.name}</p>
                  {item.customText && (
                    <p className="text-xs text-gray-400 mt-0.5">"{item.customText}"</p>
                  )}
                  <p className="text-violet-600 font-bold text-sm mt-1">AED {(item.price * item.quantity).toFixed(0)}</p>
                  
                  {/* Quantity */}
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-violet-100 flex items-center justify-center text-gray-700 font-bold transition-colors">
                      −
                    </button>
                    <span className="text-sm font-bold text-gray-800 w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-violet-100 flex items-center justify-center text-gray-700 font-bold transition-colors">
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => handleRemove(item.id, item.name)}
                  className="p-1.5 text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 self-start">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-2xl font-extrabold gradient-text">AED {subtotal.toFixed(0)}</span>
            </div>
            <Link href="/checkout" onClick={onClose}
              className="btn-primary w-full justify-center py-4 text-base rounded-2xl">
              Proceed to Checkout 🔐
            </Link>
            <button onClick={onClose}
              className="w-full text-center text-sm text-gray-400 hover:text-gray-600 py-1 transition-colors">
              ← Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
