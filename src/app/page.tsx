"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Background from '../components/Background';
import { getCurrentFlavor, getUpcomingFlavors } from '../lib/flavors';

export default function Home() {
  const currentFlavor = getCurrentFlavor();
  const upcomingFlavors = getUpcomingFlavors();

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <Background />
      
      {/* Hero Section - Current Mission */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4 text-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-4 inline-block bg-green-500 text-black font-pixel px-4 py-1 border-2 border-white animate-pulse shadow-[0_0_15px_rgba(0,255,0,0.6)]">
            ACTIVE MISSION
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-pixel mb-6 ${currentFlavor.colors.primary} drop-shadow-[0_4px_0_rgba(0,0,0,0.8)]`}>
            {currentFlavor.name.toUpperCase()}
          </h1>
          
          <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto mb-8 animate-bounce-slow">
            <Image
              src={currentFlavor.image}
              alt={currentFlavor.name}
              fill
              className="pixel-art object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              priority
            />
          </div>

          <p className="font-mono text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed bg-black bg-opacity-60 p-4 rounded border border-gray-700">
            {currentFlavor.description}
          </p>

          <Link href="/shop" className="inline-block">
             <button className="bg-red-600 hover:bg-red-500 text-white font-pixel text-2xl py-4 px-12 border-b-8 border-red-900 active:border-b-0 active:translate-y-2 transition-all shadow-[0_0_30px_rgba(255,0,0,0.4)]">
               DEPLOY TO SHOP
             </button>
          </Link>
        </div>
      </section>

      {/* Upcoming Missions Section */}
      <section className="relative z-10 bg-black bg-opacity-80 border-t-4 border-gray-800 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-pixel text-yellow-400">
              FLIGHT MANIFEST
            </h2>
            <span className="font-mono text-gray-400 text-sm md:text-base">UPCOMING DROPS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingFlavors.map((flavor) => (
              <div key={flavor.id} className="group relative border-2 border-gray-700 bg-gray-900 bg-opacity-50 p-6 rounded-lg transition-all hover:border-gray-500 hover:bg-opacity-80">
                <div className="absolute top-4 right-4 bg-gray-800 text-gray-400 font-pixel text-xs px-2 py-1 border border-gray-600">
                   T-MINUS: {flavor.dropDate}
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-4 filter brightness-0 contrast-50 group-hover:brightness-50 transition-all duration-500">
                    <Image
                      src={flavor.image}
                      alt={flavor.name}
                      width={128}
                      height={128}
                      className="pixel-art object-contain"
                    />
                     <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-pixel text-gray-600 group-hover:text-gray-400">?</span>
                    </div>
                  </div>
                  
                  <h3 className="font-pixel text-xl text-gray-500 mb-2 group-hover:text-gray-300 transition-colors">
                    CLASSIFIED
                  </h3>
                  <p className="font-mono text-gray-600 text-sm text-center max-w-xs group-hover:text-gray-500">
                    Mission details encrypted.
                    <br/>
                    Authorization pending.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
