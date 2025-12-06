"use client";

import React, { useState, useEffect } from 'react';
import { useShop } from '../../../context/ShopContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FLAVORS } from '../../../lib/flavors';

interface ProductDetailClientProps {
  flavorId: string;
}

export default function ProductDetailClient({ flavorId }: ProductDetailClientProps) {
  const { user, viewLiveProduct, addToCart } = useShop();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const flavor = FLAVORS.find(f => f.id === flavorId);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
    if (!flavor) {
      router.push('/shop');
    }
  }, [user, router, flavor]);

  if (!user || !flavor) {
    return (
      <div className="flex items-center justify-center h-full pt-16">
        <p className="text-white font-pixel">Loading...</p>
      </div>
    );
  }

  const isSoldOut = flavor.status === 'SOLD_OUT';
  const isLive = flavor.status === 'LIVE';
  const isUpcoming = flavor.status === 'UPCOMING';

  const handleAddToCart = () => {
    if (!flavor) return;
    
    addToCart({
      id: `${flavor.id}-${Date.now()}`,
      flavorId: flavor.id,
      name: flavor.name,
      image: flavor.image,
      price: flavor.price,
      quantity: quantity
    });
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleViewLive = () => {
    if (isLive) {
      viewLiveProduct();
      router.push('/shop');
    }
  };

  return (
    <div className="pt-20 pb-8 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <Link 
          href="/shop"
          className="inline-block mb-6 px-4 py-2 font-pixel text-xs border-2 border-gray-600 hover:border-yellow-400 transition-colors"
        >
          ← BACK TO SHOP
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="flex flex-col items-center">
            <div className={`relative border-4 ${flavor.colors.secondary} bg-black bg-opacity-90 p-8 rounded-lg w-full max-w-md`}>
              <div className="relative w-full aspect-square">
                <Image
                  src={flavor.image}
                  alt={flavor.name}
                  fill
                  className={`pixel-art object-contain ${isSoldOut ? 'grayscale opacity-50' : ''}`}
                />
                {isUpcoming && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl font-pixel text-gray-600">?</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            {/* Status Badge */}
            <div>
              {isSoldOut && (
                <div className="inline-block bg-red-600 text-white font-pixel px-6 py-2 border-2 border-white transform -rotate-2 shadow-lg mb-4">
                  SOLD OUT
                </div>
              )}
              {isLive && (
                <div className="inline-block bg-green-500 text-black font-pixel px-6 py-2 border-2 border-white animate-pulse shadow-[0_0_15px_rgba(0,255,0,0.6)] mb-4">
                  LIVE NOW
                </div>
              )}
              {isUpcoming && (
                <div className="inline-block bg-gray-700 text-gray-300 font-pixel px-6 py-2 border-2 border-gray-500 mb-4">
                  DROPS {flavor.dropDate}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className={`text-4xl md:text-5xl font-pixel ${flavor.colors.primary}`}>
              {flavor.name.toUpperCase()}
            </h1>

            {/* Description */}
            <div className="border-2 border-gray-700 bg-black bg-opacity-80 p-6">
              <p className="font-mono text-gray-300 text-lg leading-relaxed">
                {isUpcoming ? "CLASSIFIED DATA. AUTHORIZED PERSONNEL ONLY." : flavor.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 border-2 border-gray-700 bg-black bg-opacity-80 p-6">
              <div className="text-center">
                <div className="text-gray-500 font-mono text-sm mb-2">CRUNCH</div>
                <div className={`text-3xl font-pixel ${flavor.colors.primary}`}>
                  {isUpcoming ? '???' : flavor.stats.crunch}
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 font-mono text-sm mb-2">SWEETNESS</div>
                <div className={`text-xl font-pixel ${flavor.colors.primary}`}>
                  {isUpcoming ? '???' : flavor.stats.sweetness}
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 font-mono text-sm mb-2">RARITY</div>
                <div className={`text-xl font-pixel ${flavor.colors.primary}`}>
                  {isUpcoming ? '???' : flavor.stats.rarity}
                </div>
              </div>
            </div>

            {/* Price & Quantity */}
            {!isUpcoming && (
              <div className="border-2 border-gray-700 bg-black bg-opacity-80 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-gray-400">PRICE:</span>
                  <span className="text-yellow-400 font-pixel text-3xl">${flavor.price}</span>
                </div>
                
                {!isSoldOut && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-gray-400">QUANTITY:</span>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-8 h-8 font-pixel border-2 border-gray-600 hover:border-yellow-400"
                        >
                          -
                        </button>
                        <span className="font-pixel text-xl w-8 text-center">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-8 h-8 font-pixel border-2 border-gray-600 hover:border-yellow-400"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-700 space-y-3">
                      <div className="flex items-center justify-between font-mono">
                        <span className="text-gray-400">TOTAL:</span>
                        <span className="text-yellow-400 font-pixel text-2xl">
                          ${(flavor.price * quantity).toFixed(2)}
                        </span>
                      </div>

                      {isLive && (
                        <button
                          onClick={handleViewLive}
                          className="w-full bg-red-600 hover:bg-red-500 text-white font-pixel py-4 px-8 border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all text-xl"
                        >
                          VIEW LIVE DROP
                        </button>
                      )}

                      <button
                        onClick={handleAddToCart}
                        className={`w-full font-pixel py-3 px-8 border-b-4 active:border-b-0 active:translate-y-1 transition-all ${
                          addedToCart
                            ? 'bg-green-600 hover:bg-green-500 border-green-800 text-white'
                            : isSoldOut
                            ? 'bg-gray-600 border-gray-800 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-500 border-blue-800 text-white'
                        }`}
                        disabled={isSoldOut}
                      >
                        {addedToCart ? '✓ ADDED TO CART!' : isSoldOut ? 'SOLD OUT' : 'ADD TO CART'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Product Info */}
            <div className="border-2 border-gray-700 bg-black bg-opacity-80 p-6 space-y-3 font-mono text-sm text-gray-400">
              <div className="flex justify-between">
                <span>WEIGHT:</span>
                <span>2.5 oz (70g)</span>
              </div>
              <div className="flex justify-between">
                <span>SERVINGS:</span>
                <span>1 bag</span>
              </div>
              <div className="flex justify-between">
                <span>STORAGE:</span>
                <span>Room Temperature</span>
              </div>
              <div className="flex justify-between">
                <span>SHELF LIFE:</span>
                <span>2+ years</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
