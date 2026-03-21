"use client";

import React, { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { toast } from '@/components/ui/Toast';
import ColorPicker from '@/components/ui/ColorPicker';
import QuantitySelector from '@/components/ui/QuantitySelector';

const COLOR_PALETTE = [
  '#FF4747', '#F26522', '#F59E0B', '#10B981', '#3B82F6',
  '#7C3AED', '#EC4899', '#000000', '#FFFFFF', '#C0C0C0',
];

const COLOR_NAMES: Record<string, string> = {
  '#FF4747': 'Red', '#F26522': 'Orange', '#F59E0B': 'Gold',
  '#10B981': 'Green', '#3B82F6': 'Blue', '#7C3AED': 'Purple',
  '#EC4899': 'Pink', '#000000': 'Black', '#FFFFFF': 'White',
  '#C0C0C0': 'Silver',
};

const BALLOON_SIZES = [
  { label: 'Small', size: '12"', multiplier: 1 },
  { label: 'Medium', size: '18"', multiplier: 1.5 },
  { label: 'Large', size: '24"', multiplier: 2.2 },
  { label: 'Jumbo', size: '36"', multiplier: 3.5 },
];

const FONT_OPTIONS = [
  { label: 'Classic', family: 'Georgia, serif', preview: 'Aa' },
  { label: 'Modern', family: 'Arial, sans-serif', preview: 'Aa' },
  { label: 'Script', family: 'cursive', preview: 'Aa' },
  { label: 'Bold', family: 'Impact, sans-serif', preview: 'Aa' },
];

const BUNDLE_OPTIONS = [
  { qty: 1, label: '1 pc', discount: 0 },
  { qty: 3, label: '3 pcs', discount: 10 },
  { qty: 5, label: '5 pcs', discount: 15 },
  { qty: 10, label: '10 pcs', discount: 20 },
];

interface BalloonCustomizerProps {
  productId: number;
  price: number;
  name: string;
}

export default function BalloonCustomizer({ productId, price, name }: BalloonCustomizerProps) {
  const [customText, setCustomText] = useState('');
  const [customColor, setCustomColor] = useState('#FF4747');
  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedFont, setSelectedFont] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedBundle, setSelectedBundle] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'customize' | 'details'>('customize');

  const addToCart = useCartStore((state) => state.addToCart);

  const sizeMultiplier = BALLOON_SIZES[selectedSize].multiplier;
  const bundleDiscount = selectedBundle !== null ? BUNDLE_OPTIONS[selectedBundle].discount : 0;
  const effectiveQty = selectedBundle !== null ? BUNDLE_OPTIONS[selectedBundle].qty : quantity;
  const unitPrice = Math.round(price * sizeMultiplier);
  const totalPrice = Math.round(unitPrice * effectiveQty * (1 - bundleDiscount / 100));

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name: `${name} (${BALLOON_SIZES[selectedSize].size}${customText ? ` - "${customText}"` : ''})`,
      price: unitPrice,
      quantity: effectiveQty,
      customText: customText || undefined,
      customColor,
    });
    toast(`Added ${effectiveQty}x ${name} to cart!`, 'success');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Tab Switcher */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('customize')}
          className={`flex-1 py-3 text-sm font-bold transition-colors ${
            activeTab === 'customize'
              ? 'text-[#F26522] border-b-2 border-[#F26522]'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          🎨 Customize
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`flex-1 py-3 text-sm font-bold transition-colors ${
            activeTab === 'details'
              ? 'text-[#F26522] border-b-2 border-[#F26522]'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          📋 Details
        </button>
      </div>

      {activeTab === 'customize' ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Live Preview */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
              {/* Balloon Shape Preview */}
              <div className="relative flex flex-col items-center justify-center">
                <div
                  className="rounded-full flex items-center justify-center transition-all duration-300 shadow-lg relative overflow-hidden"
                  style={{
                    width: `${100 + selectedSize * 30}px`,
                    height: `${120 + selectedSize * 35}px`,
                    backgroundColor: customColor,
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  }}
                >
                  {/* Shine effect */}
                  <div className="absolute top-3 left-4 w-6 h-8 bg-white/30 rounded-full blur-sm transform -rotate-12" />
                  {/* Custom text on balloon */}
                  {customText && (
                    <span
                      className="text-center px-3 leading-tight font-bold drop-shadow-sm z-10"
                      style={{
                        fontFamily: FONT_OPTIONS[selectedFont].family,
                        fontSize: `${Math.max(10, 16 - Math.floor(customText.length / 8))}px`,
                        color: ['#FFFFFF', '#F59E0B', '#C0C0C0'].includes(customColor) ? '#333' : '#fff',
                        maxWidth: '80%',
                        wordBreak: 'break-word',
                      }}
                    >
                      {customText}
                    </span>
                  )}
                </div>
                {/* Balloon knot */}
                <div
                  className="w-3 h-3 -mt-1 transform rotate-45"
                  style={{ backgroundColor: customColor, filter: 'brightness(0.8)' }}
                />
                {/* String */}
                <div className="w-[1px] h-10 bg-gray-300" />
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">Live preview - actual product may vary</p>
          </div>

          {/* Customization Controls */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Size Selector */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                📏 Size <span className="text-gray-400 font-normal text-xs">({BALLOON_SIZES[selectedSize].size})</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {BALLOON_SIZES.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => setSelectedSize(i)}
                    className={`py-2.5 px-2 rounded-xl text-center transition-all border-2 ${
                      selectedSize === i
                        ? 'border-[#F26522] bg-[#FFF3EC] text-[#F26522]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{s.size}</div>
                    <div className="text-[10px] text-gray-400">{s.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                🎨 Color <span className="text-gray-400 font-normal text-xs">({COLOR_NAMES[customColor] || 'Custom'})</span>
              </label>
              <ColorPicker colors={COLOR_PALETTE} selected={customColor} onChange={setCustomColor} />
            </div>

            {/* Custom Text */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                ✏️ Custom Text <span className="text-gray-400 font-normal text-xs">(optional)</span>
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={30}
                placeholder="e.g. Happy Birthday, Congratulations..."
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#F26522] transition-colors"
              />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-gray-400">Add a personal message to your balloon</span>
                <span className="text-[10px] text-gray-400">{customText.length}/30</span>
              </div>
            </div>

            {/* Font Style (only if text entered) */}
            {customText && (
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">🔤 Font Style</label>
                <div className="grid grid-cols-4 gap-2">
                  {FONT_OPTIONS.map((f, i) => (
                    <button
                      key={f.label}
                      onClick={() => setSelectedFont(i)}
                      className={`py-2 px-2 rounded-xl text-center transition-all border-2 ${
                        selectedFont === i
                          ? 'border-[#F26522] bg-[#FFF3EC]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-base" style={{ fontFamily: f.family }}>{f.preview}</div>
                      <div className="text-[10px] text-gray-500">{f.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bundle Options */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                📦 Bundle &amp; Save
              </label>
              <div className="grid grid-cols-4 gap-2">
                {BUNDLE_OPTIONS.map((b, i) => (
                  <button
                    key={b.qty}
                    onClick={() => setSelectedBundle(selectedBundle === i ? null : i)}
                    className={`py-2 px-2 rounded-xl text-center transition-all border-2 relative ${
                      selectedBundle === i
                        ? 'border-[#F26522] bg-[#FFF3EC]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-gray-800">{b.label}</div>
                    {b.discount > 0 && (
                      <div className="text-[10px] font-bold text-[#FF4747]">-{b.discount}%</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity (when no bundle selected) */}
            {selectedBundle === null && (
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">🔢 Quantity</label>
                <QuantitySelector value={quantity} onChange={setQuantity} />
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Details Tab */
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">Material</div>
              <div className="text-sm font-bold text-gray-800">Premium Latex / Foil</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">Available Sizes</div>
              <div className="text-sm font-bold text-gray-800">12&quot; - 36&quot;</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">Filling</div>
              <div className="text-sm font-bold text-gray-800">Air / Helium</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">Float Time</div>
              <div className="text-sm font-bold text-gray-800">8-12 hours</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">Custom Text</div>
              <div className="text-sm font-bold text-gray-800">Up to 30 chars</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">Delivery</div>
              <div className="text-sm font-bold text-gray-800">Same-day available</div>
            </div>
          </div>
          <div className="bg-[#FFF3EC] rounded-xl p-3 mt-1">
            <div className="text-xs font-bold text-[#F26522] mb-1">Care Instructions</div>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>Keep away from sharp objects and direct sunlight</li>
              <li>Helium-filled balloons float for 8-12 hours</li>
              <li>Air-filled balloons last several days</li>
              <li>Store in cool, dry place before inflating</li>
            </ul>
          </div>
        </div>
      )}

      {/* Price Summary + Add to Cart */}
      <div className="bg-white border-t border-gray-100 pt-4 mt-1">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-gray-400">
              {effectiveQty}x {BALLOON_SIZES[selectedSize].size} {COLOR_NAMES[customColor] || 'Custom'} Balloon
              {bundleDiscount > 0 && <span className="text-[#FF4747] font-bold ml-1">(-{bundleDiscount}%)</span>}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-[#F26522]">AED {totalPrice}</span>
              {bundleDiscount > 0 && (
                <span className="text-sm text-gray-400 line-through">
                  AED {Math.round(unitPrice * effectiveQty)}
                </span>
              )}
            </div>
          </div>
          <div className="text-right text-[10px] text-gray-400">
            AED {unitPrice} each
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className={`w-full py-3.5 rounded-xl font-bold text-base transition-all ${
            added
              ? 'bg-[#00B578] text-white'
              : 'bg-[#F26522] text-white hover:bg-[#D4520F] active:scale-[0.98]'
          }`}
        >
          {added ? '✓ Added to Cart!' : `Add to Cart — AED ${totalPrice}`}
        </button>
      </div>
    </div>
  );
}
