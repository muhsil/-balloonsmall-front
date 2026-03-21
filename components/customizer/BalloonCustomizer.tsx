"use client";

import React, { useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Text } from 'react-konva';
import useImage from 'use-image';
import { useCartStore } from '@/store/useCartStore';

export default function BalloonCustomizer({ productId, price, name }: { productId: number, price: number, name: string }) {
  const [customText, setCustomText] = useState('Happy Birthday!');
  const [customColor, setCustomColor] = useState('#000000');
  
  // You must place a valid transparent balloon PNG in /public/balloon-template.png
  const [image] = useImage('/balloon-template.png'); 
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name,
      price,
      quantity: 1,
      customText,
      customColor
    });
    alert('Added to cart!');
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start my-8 p-4 bg-white shadow-sm rounded-xl">
      <div className="flex-1 bg-gray-50 p-4 rounded-lg flex justify-center items-center border border-gray-200">
        <Stage width={300} height={400}>
          <Layer>
            {image && (
              <KonvaImage 
                image={image} 
                width={300} 
                height={400} 
              />
            )}
            {/* Fallback circle if no image is available yet */}
            {!image && (
              <Text 
                text="[Balloon Image Placeholder]" 
                x={70} 
                y={150} 
                fontSize={14} 
              />
            )}
            <Text
              text={customText}
              x={50}
              y={180}
              width={200}
              fill={customColor}
              fontSize={24}
              align="center"
              fontFamily="Arial"
              fontStyle="bold"
              wrap="word"
            />
          </Layer>
        </Stage>
      </div>

      <div className="flex-1 flex flex-col gap-6 w-full">
        <h2 className="text-2xl font-bold text-gray-800">Customize Your Balloon</h2>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Custom Text</label>
          <input 
            type="text" 
            value={customText} 
            onChange={(e) => setCustomText(e.target.value)} 
            maxLength={30}
            className="border p-3 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter text (e.g., Happy Birthday)"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Text Color</label>
          <div className="flex items-center gap-3">
            <input 
              type="color" 
              value={customColor} 
              onChange={(e) => setCustomColor(e.target.value)} 
              className="w-12 h-12 p-1 border border-gray-300 rounded cursor-pointer"
            />
            <span className="text-sm text-gray-600 font-mono">{customColor}</span>
          </div>
        </div>

        <button 
          onClick={handleAddToCart}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg shadow-md transition-colors"
        >
          Add to Cart - AED {price}
        </button>
      </div>
    </div>
  );
}
