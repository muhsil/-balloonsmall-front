"use client";

import React from 'react';

export default function SupportBox() {
  return (
    <div className="mt-6 p-6 bg-gradient-to-br from-violet-600 to-pink-500 rounded-[2rem] text-white shadow-xl shadow-violet-200">
      <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-1">
        Need help?
      </p>
      <p className="text-lg font-bold mb-4 leading-tight">
        Expert assistance is just a message away.
      </p>
      <a
        href="https://wa.me/971563554303"
        className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all text-sm"
      >
        WhatsApp Support 💬
      </a>
    </div>
  );
}
