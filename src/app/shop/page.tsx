"use client";

import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Background from '../../components/Background';
import { FLAVORS, Flavor, getCurrentFlavor } from '../../lib/flavors';
import LiveProductScreen from '../../components/LiveProductScreen';

const FlavorCard = ({ flavor }: { flavor: Flavor }) => {
  const isSoldOut = flavor.status === 'SOLD_OUT';
  const isLive = flavor.status === 'LIVE';
  const isUpcoming = flavor.status === 'UPCOMING';

  return (
    <Link href={`/shop/${flavor.id}`}>
      <div className={`relative group border-4 ${flavor.colors.secondary} bg-black bg-opacity-90 p-6 rounded-lg flex flex-col items-center min-w-[280px] md:min-w-[320px] transition-all duration-300 hover:scale-105 cursor-pointer ${isLive ? 'ring-4 ring-yellow-400 ring-opacity-50' : 'opacity-90 hover:opacity-100'}`}>
        {/* Status Badge */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20 whitespace-nowrap">
          {isSoldOut && (
            <div className="bg-red-600 text-white font-pixel px-4 py-1 border-2 border-white transform -rotate-3 shadow-lg">
              SOLD OUT
            </div>
          )}
          {isLive && (
            <div className="bg-green-500 text-black font-pixel px-4 py-1 border-2 border-white animate-pulse shadow-[0_0_15px_rgba(0,255,0,0.6)]">
              LIVE NOW
            </div>
          )}
          {isUpcoming && (
            <div className="bg-gray-700 text-gray-300 font-pixel px-4 py-1 border-2 border-gray-500">
              DROPS {flavor.dropDate}
            </div>
          )}
        </div>

        {/* Image */}
        <div className={`relative w-48 h-48 my-4 ${isUpcoming ? 'brightness-0 contrast-50' : ''}`}>
          <Image
            src={flavor.image}
            alt={flavor.name}
            width={192}
            height={192}
            className={`pixel-art object-contain ${isSoldOut ? 'grayscale opacity-50' : ''}`}
          />
          {isUpcoming && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-pixel text-gray-600">?</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="w-full text-center space-y-3">
          <h3 className={`font-pixel text-xl ${flavor.colors.primary}`}>
            {flavor.name.toUpperCase()}
          </h3>
          <p className="font-mono text-gray-400 text-sm leading-tight h-12 overflow-hidden">
            {isUpcoming ? "CLASSIFIED DATA" : flavor.description}
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 text-xs font-mono border-t border-gray-700 pt-3">
            <div>
              <span className="text-gray-500 block">CRUNCH</span>
              <span className={flavor.colors.primary}>{isUpcoming ? '???' : flavor.stats.crunch}</span>
            </div>
            <div>
              <span className="text-gray-500 block">SWEET</span>
              <span className={flavor.colors.primary}>{isUpcoming ? '???' : flavor.stats.sweetness}</span>
            </div>
            <div>
              <span className="text-gray-500 block">RARITY</span>
              <span className={flavor.colors.primary}>{isUpcoming ? '???' : flavor.stats.rarity}</span>
            </div>
          </div>

          {/* Price */}
          {!isUpcoming && (
            <div className="pt-3 border-t border-gray-700">
              <div className="text-yellow-400 font-pixel text-2xl">${flavor.price}</div>
              {isLive && (
                <div className="mt-2 text-green-400 font-pixel text-xs animate-pulse">
                  ▼ ADD TO CART ▼
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

const ShopContent = () => {
  const { user, dropPhase, viewLiveProduct, authLoading } = useShop();
  const router = useRouter();
  const pathname = usePathname();
  const [filter, setFilter] = useState<'ALL' | 'LIVE' | 'UPCOMING' | 'SOLD_OUT'>('ALL');
  const currentFlavor = getCurrentFlavor();

  useEffect(() => {
    // Only redirect when auth has finished loading AND there's no user
    // if (!authLoading && !user) {
    //   router.push('/');
    // }
  }, [authLoading, user, router]);

  // Show loading state while auth is initializing or no user
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-full pt-16">
        <p className="text-white font-pixel">Loading...</p>
      </div>
    );
  }

  // Show live product screen if drop is live
  if (dropPhase === 'DROP_LIVE') {
    return <LiveProductScreen />;
  }

  const filteredFlavors = filter === 'ALL' 
    ? FLAVORS 
    : FLAVORS.filter(f => f.status === filter);

  return (
    <div className="pt-20 pb-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-pixel text-yellow-400 mb-4">
            FLAVOR DROPS
          </h1>
          <p className="font-mono text-gray-400 text-lg">
            LIMITED EDITION FREEZE-DRIED ICE CREAM
          </p>
        </div>

        {/* Current Drop Banner */}
        {currentFlavor && currentFlavor.status === 'LIVE' && (
          <div className={`mb-8 border-4 ${currentFlavor.colors.secondary} bg-black bg-opacity-90 p-6 rounded-lg`}>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
                <div className={`font-pixel text-2xl ${currentFlavor.colors.primary} mb-2 animate-pulse`}>
                  LIVE NOW: {currentFlavor.name.toUpperCase()}
                </div>
                <p className="font-mono text-gray-300">{currentFlavor.description}</p>
                <div className="mt-4 flex justify-center md:justify-start">
                  <button
                    onClick={viewLiveProduct}
                    className="bg-red-600 hover:bg-red-500 text-white font-pixel py-3 px-8 border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all"
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
              <div className="w-32 h-32 md:w-48 md:h-48">
                <Image
                  src={currentFlavor.image}
                  alt={currentFlavor.name}
                  width={192}
                  height={192}
                  className="pixel-art"
                />
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(['ALL', 'LIVE', 'UPCOMING', 'SOLD_OUT'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 font-pixel text-xs border-2 transition-all ${
                filter === f
                  ? 'bg-snes-blue border-yellow-400 text-yellow-400'
                  : 'border-gray-600 text-gray-400 hover:border-gray-400'
              }`}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {filteredFlavors.map((flavor) => (
            <FlavorCard key={flavor.id} flavor={flavor} />
          ))}
        </div>

        {filteredFlavors.length === 0 && (
          <div className="text-center py-12">
            <p className="font-pixel text-gray-500 text-xl">NO FLAVORS FOUND</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function ShopPage() {
  return (
    <>
      <Background />
      <ShopContent />
    </>
  );
}
