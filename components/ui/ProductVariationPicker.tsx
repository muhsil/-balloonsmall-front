"use client";

import React, { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { toast } from '@/components/ui/Toast';
import QuantitySelector from './QuantitySelector';
import { useStoreSettings } from '@/components/providers/StoreSettingsProvider';

interface Attribute {
  id: number;
  name: string;
  slug: string;
  options: string[];
  variation: boolean;
}

interface Variation {
  id: number;
  price: string;
  regular_price: string;
  attributes: { name: string; option: string }[];
  image?: { src: string };
  in_stock?: boolean;
}

interface ProductVariationPickerProps {
  productId: number;
  productName: string;
  basePrice: number;
  image: string;
  attributes: Attribute[];
  variations: Variation[];
}

export default function ProductVariationPicker({
  productId,
  productName,
  basePrice,
  image,
  attributes,
  variations,
}: ProductVariationPickerProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const { currency } = useStoreSettings();
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [added, setAdded] = useState(false);

  const variationAttributes = attributes.filter((a) => a.variation);
  const hasVariations = variationAttributes.length > 0 && variations.length > 0;

  const matchedVariation = hasVariations
    ? variations.find((v) =>
        variationAttributes.every((attr) => {
          const sel = selected[attr.slug];
          if (!sel) return false;
          const vAttr = v.attributes.find(
            (va) => va.name.toLowerCase() === attr.name.toLowerCase() || va.name.toLowerCase() === attr.slug
          );
          return vAttr && (vAttr.option === '' || vAttr.option.toLowerCase() === sel.toLowerCase());
        })
      )
    : null;

  const allSelected = hasVariations
    ? variationAttributes.every((a) => selected[a.slug])
    : true;

  const currentPrice = matchedVariation
    ? parseFloat(matchedVariation.price || '0')
    : basePrice;

  const currentImage = matchedVariation?.image?.src || image;

  const isInStock = matchedVariation ? matchedVariation.in_stock !== false : true;

  const handleSelect = (attrSlug: string, option: string) => {
    setSelected((prev) => ({ ...prev, [attrSlug]: option }));
  };

  const handleAddToCart = () => {
    if (hasVariations && !allSelected) {
      toast('Please select all options', 'error');
      return;
    }
    if (hasVariations && !matchedVariation) {
      toast('This combination is not available', 'error');
      return;
    }

    const variantLabel = hasVariations
      ? variationAttributes.map((a) => selected[a.slug]).join(' / ')
      : undefined;

    addToCart({
      id: matchedVariation?.id || productId,
      productId: matchedVariation ? productId : undefined,
      name: productName,
      price: currentPrice,
      quantity,
      image: currentImage,
      variant: variantLabel,
    });

    toast(`Added ${productName} to cart!`, 'success');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Variation Selectors */}
      {variationAttributes.map((attr) => (
        <div key={attr.slug}>
          <label className="text-xs font-bold text-gray-700 mb-2 block">
            {attr.name}
            {selected[attr.slug] && (
              <span className="text-[#E53935] ml-1">: {selected[attr.slug]}</span>
            )}
          </label>
          <div className="flex flex-wrap gap-2">
            {attr.options.map((opt) => {
              const isSelected = selected[attr.slug] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(attr.slug, opt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'border-[#E53935] bg-[#FFEBEE] text-[#E53935]'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Price update for selected variation */}
      {hasVariations && matchedVariation && currentPrice !== basePrice && (
        <div className="text-sm font-bold text-[#E53935]">
          {currency} {currentPrice.toFixed(0)}
        </div>
      )}

      {/* Quantity + Add to Cart */}
      <div className="flex items-center gap-3">
        <QuantitySelector value={quantity} onChange={setQuantity} size="sm" />
        <button
          onClick={handleAddToCart}
          disabled={!isInStock || (hasVariations && (!allSelected || !matchedVariation))}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            added
              ? 'bg-[#00B578] text-white'
              : 'bg-[#E53935] text-white hover:bg-[#C62828] active:scale-[0.98]'
          }`}
        >
          {added ? '\u2713 Added!' : !isInStock ? 'Out of Stock' : `Add to Cart \u2022 ${currency} ${(currentPrice * quantity).toFixed(0)}`}
        </button>
      </div>
    </div>
  );
}
