"use client";

import React, { useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Text, Circle } from 'react-konva';
import useImage from 'use-image';
import { useCartStore } from '@/store/useCartStore';
import { toast } from '@/components/ui/Toast';
import ColorPicker from '@/components/ui/ColorPicker';
import QuantitySelector from '@/components/ui/QuantitySelector';

const COLOR_PALETTE = [
  '#7C3AED', '#EC4899', '#F59E0B', '#10B981', '#3B82F6',
  '#EF4444', '#000000', '#FFFFFF', '#6B7280', '#F97316'
];

const FONT_SIZES = [18, 22, 28, 36];

export default function BalloonCustomizer({ productId, price, name }: { productId: number, price: number, name: string }) {
  const [customText, setCustomText] = useState('Happy Birthday! 🎉');
  const [customColor, setCustomColor] = useState('#7C3AED');
  const [fontSize, setFontSize] = useState(24);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const [image] = useImage('/balloon-template.png');
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({ id: productId, name, price, quantity, customText, customColor });
    toast(`🎈 "${name}" added to cart!`, 'success');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start">
      {/* Canvas Preview */}
      <div className="flex-1 flex flex-col items-center gap-4">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Live Preview</p>
        <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white"
          style={{ background: 'linear-gradient(135deg, #f5f3ff, #fce7f3)' }}>
          <Stage width={300} height={380}>
            <Layer>
              {image
                ? <KonvaImage image={image} width={300} height={380} />
                : <Circle x={150} y={180} radius={130} fill={`${customColor}22`} stroke={customColor} strokeWidth={3} />
              }
              <Text
                text={customText}
                x={30} y={155} width={240}
                fill={customColor}
                fontSize={fontSize}
                align="center"
                fontFamily="Arial"
                fontStyle="bold"
                wrap="word"
              />
            </Layer>
          </Stage>
        </div>
        <p className="text-xs text-gray-400 font-medium">This is a preview — actual product may vary slightly.</p>
      </div>

      {/* Controls */}
      <div className="flex-1 flex flex-col gap-6 w-full">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">✏️ Custom Text</label>
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            maxLength={40}
            className="input"
            placeholder="Enter your message..."
          />
          <div className="text-xs text-gray-400 text-right mt-1">{customText.length}/40</div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">🎨 Text Color</label>
          <ColorPicker colors={COLOR_PALETTE} selected={customColor} onChange={setCustomColor} />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">🔡 Font Size</label>
          <div className="flex gap-2">
            {FONT_SIZES.map(s => (
              <button key={s} onClick={() => setFontSize(s)}
                className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all ${fontSize === s ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                {s}px
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">📦 Quantity</label>
          <QuantitySelector value={quantity} onChange={setQuantity} />
        </div>

        {/* Total + Add to Cart */}
        <div className="mt-2 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 font-medium">Total</span>
            <span className="text-2xl font-extrabold gradient-text">AED {(price * quantity).toFixed(0)}</span>
          </div>
          <button onClick={handleAddToCart}
            className={`w-full btn-primary py-4 text-base rounded-2xl justify-center transition-all ${added ? 'from-green-500 to-emerald-400' : ''}`}>
            {added ? '✓ Added to Cart!' : `Add to Cart — AED ${(price * quantity).toFixed(0)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
