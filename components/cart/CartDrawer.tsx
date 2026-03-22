"use client";
import { useCartStore } from '@/store/useCartStore';
import { toast } from '@/components/ui/Toast';
import Link from 'next/link';
import CartItemCard from '@/components/ui/CartItemCard';

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
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <h2 className="text-base font-extrabold text-gray-900">Your Cart <span className="text-[#F26522]">({items.length})</span></h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-3">🎈</div>
              <p className="text-gray-500 font-medium text-sm">Your cart is empty</p>
              <button onClick={onClose} className="mt-3 text-[#F26522] font-semibold text-sm hover:underline">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <CartItemCard
                key={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
                variantLabel={item.variant}
                variant="drawer"
                onQuantityChange={(q) => updateQuantity(item.id, q)}
                onRemove={() => handleRemove(item.id, item.name)}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-4 py-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm font-medium">Subtotal</span>
              <span className="text-xl font-extrabold text-[#F26522]">AED {subtotal.toFixed(0)}</span>
            </div>
            <Link href="/checkout" onClick={onClose}
              className="btn-primary w-full justify-center py-3.5 text-sm rounded-xl">
              Checkout
            </Link>
            <button onClick={onClose}
              className="w-full text-center text-xs text-gray-400 hover:text-gray-600 py-1 transition-colors">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
