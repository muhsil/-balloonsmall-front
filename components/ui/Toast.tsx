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
          {t.type === 'success' ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> : t.type === 'error' ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          {t.message}
        </div>
      ))}
      <style>{`@keyframes fadeInUp { from { opacity:0; transform: translateY(12px);} to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
