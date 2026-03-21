"use client";
import { useEffect, useState } from 'react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastId = 0;
const listeners: ((toasts: Toast[]) => void)[] = [];
let toastList: Toast[] = [];

export function toast(message: string, type: Toast['type'] = 'success') {
  const id = ++toastId;
  toastList = [...toastList, { id, message, type }];
  listeners.forEach(l => l(toastList));
  setTimeout(() => {
    toastList = toastList.filter(t => t.id !== id);
    listeners.forEach(l => l(toastList));
  }, 3500);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  useEffect(() => {
    listeners.push(setToasts);
    return () => { listeners.splice(listeners.indexOf(setToasts), 1); };
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-3 items-center pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className={`flex items-center gap-3 px-5 py-3 rounded-full shadow-xl text-white text-sm font-semibold
          transition-all duration-500
          ${t.type === 'success' ? 'bg-gradient-to-r from-violet-600 to-pink-500'
          : t.type === 'error' ? 'bg-red-500' : 'bg-gray-800'}`}
          style={{ animation: 'fadeInUp 0.3s ease' }}>
          {t.type === 'success' ? '🎈' : t.type === 'error' ? '❌' : 'ℹ️'}
          {t.message}
        </div>
      ))}
      <style>{`@keyframes fadeInUp { from { opacity:0; transform: translateY(12px);} to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
