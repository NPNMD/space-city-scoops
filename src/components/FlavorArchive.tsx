"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FLAVORS, Flavor } from '../lib/flavors';

const FlavorCard = ({ flavor }: { flavor: Flavor }) => {
  const isSoldOut = flavor.status === 'SOLD_OUT';
  const isLive = flavor.status === 'LIVE';
  const isUpcoming = flavor.status === 'UPCOMING';

  return (
    <Link href={`/shop/${flavor.id}`}>
      <div className={`relative group border-4 ${flavor.colors.secondary} bg-black bg-opacity-80 p-4 rounded-lg flex flex-col items-center min-w-[280px] md:min-w-[320px] transition-all duration-300 hover:scale-105 ${isLive ? 'ring-4 ring-yellow-400 ring-opacity-50 scale-105 z-10' : 'opacity-80 hover:opacity-100 cursor-pointer'}`}>
        
        {/* Status Badge */}

      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20 whitespace-nowrap">
        {isSoldOut && (
          <div className="bg-red-600 text-white font-pixel px-4 py-1 border-2 border-white transform -rotate-3 shadow-lg">
            SOLD OUT ({flavor.soldOutTime})
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

      {/* Image Container */}
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
      <div className="w-full text-center space-y-2">
        <h3 className={`font-pixel text-lg md:text-xl ${flavor.colors.primary}`}>
          {flavor.name.toUpperCase()}
        </h3>
        <p className="font-mono text-gray-400 text-sm leading-tight h-10 overflow-hidden">
          {isUpcoming ? "CLASSIFIED DATA. AUTHORIZED PERSONNEL ONLY." : flavor.description}
        </p>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 text-xs font-mono border-t border-gray-700 pt-2 mt-2">
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

        {isLive && (
             <div className="mt-4 animate-bounce text-yellow-400 font-pixel text-xs">
                ▼ DEPLOY TO BATTLE ▼
             </div>
        )}
      </div>
    </div>
    </Link>
  );
};

const FlavorArchive = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      {/* Carousel Container */}
      <div className="relative group">
        <div className="flex overflow-x-auto pt-12 pb-8 space-x-6 md:space-x-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-900 px-4">
          {FLAVORS.map((flavor) => (
            <div key={flavor.id} className="snap-center shrink-0">
              <FlavorCard flavor={flavor} />
            </div>
          ))}
        </div>
        
        {/* Scroll Hints (visible on hover/desktop) */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="text-center mt-4">
        <div className="inline-block border-2 border-gray-600 bg-black bg-opacity-90 p-4">
             <h4 className="text-gray-400 font-pixel text-sm mb-2">MISSION LOG</h4>
             <p className="font-mono text-xs text-gray-500">
                TOTAL FLAVORS: {FLAVORS.length} | COLLECTED: 0 | MISSED: 1
             </p>
        </div>
      </div>
    </div>
  );
};

export default FlavorArchive;

