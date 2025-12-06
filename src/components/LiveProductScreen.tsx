"use client";

import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import Image from 'next/image';
import PurchaseTicker from './PurchaseTicker';
import { getCurrentFlavor } from '../lib/flavors';
import { sfx } from '../lib/audio';

const LiveProductScreen = () => {
  const { stock, stockVelocity, purchaseProduct, dropPhase, recentPurchases, user, addToCart } = useShop();
  const [showMenu, setShowMenu] = useState(false);
  const [purchaseAnim, setPurchaseAnim] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'SELECT' | 'PROCESSING' | 'CONFIRMED'>('SELECT');
  const flavor = getCurrentFlavor();

  const handleBuyNowClick = () => {
    sfx.playClick();
    setShowMenu(true);
    setCheckoutStep('SELECT');
  };

  const handleCheckout = (method: string) => {
    sfx.playClick();
    setIsProcessing(true);
    setCheckoutStep('PROCESSING');
    
    // Simulate processing delay
    setTimeout(() => {
        setIsProcessing(false);
        setCheckoutStep('CONFIRMED');
        
        // Play success animation/sound logic here
        sfx.playSuccess();
        setPurchaseAnim(true);
        setTimeout(() => setPurchaseAnim(false), 500);
        
        // Execute purchase logic
        addToCart({
            id: `${flavor.id}-order-${Date.now()}`,
            flavorId: flavor.id,
            name: flavor.name,
            image: flavor.image,
            price: flavor.price,
            quantity: 1
        });
        
        purchaseProduct(1); // Purchase 1 bag

        // Reset menu after short delay
        setTimeout(() => {
            setShowMenu(false);
            setCheckoutStep('SELECT');
        }, 1500);
    }, 2000);
  };

  // Determine stock level color
  const getStockColor = () => {
    if (stock >= 60) return flavor.colors.primary;
    if (stock >= 30) return 'text-yellow-400';
    return 'text-red-500';
  };

  // Determine Stock Bar gradient
  const getStockBarGradient = () => {
    if (stock >= 60) return `bg-gradient-to-r ${flavor.colors.background}`;
    if (stock >= 30) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    return 'bg-gradient-to-r from-red-400 to-red-600';
  };

  // Get milestone warning
  const getMilestoneWarning = () => {
    if (stock <= 5) return '⚡ LAST CHANCE - ONLY 5 LEFT! ⚡';
    if (stock <= 10) return '🔥 FINAL UNITS - ACT NOW! 🔥';
    if (stock <= 25) return '⚠️ CRITICAL: Only 25 remaining! ⚠️';
    if (stock <= 50) return '⚡ HALF DEPLETED - Stock moving fast! ⚡';
    return null;
  };

  // Get urgency level
  const getUrgencyLevel = () => {
    if (stock <= 10) return 'CRITICAL';
    if (stock <= 25) return 'HIGH';
    if (stock <= 50) return 'MEDIUM';
    return 'LOW';
  };

  const milestoneWarning = getMilestoneWarning();
  const isHighVelocity = stockVelocity > 20; // High velocity if > 20 units/min

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col relative">
      {/* Product Header */}
      <div className="flex justify-between items-start p-4 w-full absolute top-0 left-0 z-20">
        {/* User Info */}
        <div className="flex items-center space-x-2 bg-snes-blue border-2 border-white p-2 rounded shadow-lg">
            <Image src="/assets/astronaut.png" alt="User" width={40} height={40} className="pixel-art border border-white" />
            <div className="text-white font-mono text-sm leading-tight">
                <p className="text-yellow-400">{user?.displayName?.toUpperCase() || 'GUEST'}</p>
                <p className="text-xs text-green-400 animate-pulse">● CONNECTED</p>
            </div>
        </div>

        {/* Stock Level Bar */}
        <div className="w-1/2 md:w-1/3">
            <div className="flex justify-between text-white font-pixel text-xs mb-1">
                <span>{flavor.name.toUpperCase()} - LIVE DROP</span>
                <span>STOCK: {stock}/100</span>
            </div>
            <div className={`w-full h-6 bg-gray-800 border-2 ${flavor.colors.secondary} relative overflow-hidden shadow-inner`}>
                <div
                    className={`h-full transition-all duration-300 ${getStockBarGradient()} ${stock < 30 ? 'animate-pulse' : ''}`}
                    style={{ width: `${stock}%` }}
                >
                  {/* Particle effect overlay when stock is low */}
                  {stock < 30 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
                  )}
                </div>
                {/* Velocity indicator */}
                {isHighVelocity && (
                  <div className="absolute right-1 top-0 bottom-0 flex items-center">
                    <span className="text-white text-xl animate-bounce">↓</span>
                  </div>
                )}
            </div>
        </div>
      </div>

      {/* Stock Counter - Prominent Display */}
      <div className="absolute top-20 right-4 z-30 hidden md:block">
        <div className={`bg-black bg-opacity-95 border-4 ${stock >= 60 ? 'border-green-400' : stock >= 30 ? 'border-yellow-400' : 'border-red-500'} rounded-lg p-4 shadow-2xl transition-all duration-300 ${stock < 30 ? 'animate-pulse' : ''}`}>
          <div className="text-white font-pixel text-xs text-center mb-1 opacity-75">
            STOCK REMAINING
          </div>
          <div className={`font-pixel text-3xl md:text-5xl ${getStockColor()} ${stock < 30 ? 'animate-pulse' : ''} text-center tracking-wider`}>
            {stock}
          </div>
          <div className="text-white font-pixel text-xs md:text-sm text-center mt-2 opacity-75">
            VELOCITY: {stockVelocity.toFixed(1)} units/min
          </div>
          {isHighVelocity && stock > 0 && (
            <div className="mt-2 bg-yellow-600 border-2 border-yellow-400 px-2 py-1 animate-pulse">
              <div className="text-black font-pixel text-xs text-center">
                🔥 SELLING FAST! 🔥
              </div>
            </div>
          )}
          {milestoneWarning && (
            <div className="mt-3 bg-red-600 border-2 border-yellow-400 px-3 py-2 animate-pulse shadow-[0_0_20px_rgba(255,0,0,0.8)]">
              <div className="text-yellow-400 font-pixel text-xs md:text-sm text-center">
                {milestoneWarning}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Display (Center) */}
      <div className="flex-1 flex flex-col items-center justify-center relative mt-24 md:mt-0 mb-4">
        {/* Mobile Stock Info */}
        <div className="md:hidden mb-4 text-center">
            <span className={`font-pixel text-4xl ${getStockColor()}`}>{stock}</span>
            <span className="text-xs text-gray-400 block">REMAINING</span>
        </div>

        {/* Product Image */}
        <div className={`relative transition-transform duration-100 ${purchaseAnim ? 'translate-x-2 translate-y-[-2px] brightness-150' : 'animate-bounce-slow'}`}>
            <div className="relative w-48 h-48 md:w-80 md:h-80">
                <Image 
                    src={flavor.image} 
                    alt={flavor.name} 
                    fill
                    className="pixel-art object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                    priority
                />
            </div>
             {purchaseAnim && (
                <div className="absolute top-0 right-0 text-green-500 font-pixel text-4xl animate-ping">
                    +1 SOLD
                </div>
            )}
        </div>

        {/* Product Stats - Desktop (Absolute) */}
        <div className={`hidden md:block absolute right-4 md:right-20 top-1/3 bg-gray-900 border-2 ${flavor.colors.secondary} p-4 font-mono ${flavor.colors.primary} text-sm md:text-lg shadow-lg opacity-90`}>
            <p>CRUNCH: {flavor.stats.crunch}</p>
            <p>SWEET: {flavor.stats.sweetness}</p>
            <p>RARITY: {flavor.stats.rarity}</p>
        </div>

        {/* Product Stats - Mobile (Relative) */}
        <div className="md:hidden mt-6 flex space-x-4 bg-gray-900 bg-opacity-80 p-3 rounded border border-gray-700">
            <div className="text-center">
                <div className="text-[10px] text-gray-500">CRUNCH</div>
                <div className={`text-sm ${flavor.colors.primary}`}>{flavor.stats.crunch}</div>
            </div>
            <div className="text-center">
                <div className="text-[10px] text-gray-500">SWEET</div>
                <div className={`text-sm ${flavor.colors.primary}`}>{flavor.stats.sweetness}</div>
            </div>
            <div className="text-center">
                <div className="text-[10px] text-gray-500">RARITY</div>
                <div className={`text-sm ${flavor.colors.primary}`}>{flavor.stats.rarity}</div>
            </div>
        </div>
      </div>

      {/* Purchase Ticker */}
      <div className="w-full relative z-20 mb-4 px-4">
        <PurchaseTicker recentPurchases={recentPurchases} />
      </div>

      {/* Purchase Controls (Bottom) */}
      <div className="pb-8 w-full flex justify-center relative z-30 px-4">
        {!showMenu ? (
             <button 
                onClick={handleBuyNowClick}
                onMouseEnter={() => sfx.playHover()}
                className="w-full md:w-auto bg-red-600 hover:bg-red-500 text-white font-pixel text-xl md:text-3xl py-6 px-12 rounded-lg border-b-8 border-red-900 active:border-b-0 active:translate-y-2 shadow-[0_0_30px_rgba(255,0,0,0.6)] animate-pulse flex flex-col items-center"
            >
                <span>BUY NOW ($20)</span>
                <span className="text-xs md:text-sm opacity-80 mt-1 font-mono normal-case tracking-normal">
                    (Secure Your Bag)
                </span>
            </button>
        ) : (
            <div className="bg-gray-800 border-4 border-gray-500 p-4 rounded-lg w-full max-w-md shadow-2xl relative">
                <button 
                    onClick={() => { sfx.playClick(); setShowMenu(false); }}
                    className="absolute -top-4 -right-4 bg-red-600 border-2 border-white w-8 h-8 rounded-full font-pixel text-white flex items-center justify-center hover:bg-red-500"
                >
                    X
                </button>
                
                {checkoutStep === 'SELECT' && (
                    <div className="space-y-3">
                        <div className="text-center font-pixel text-yellow-400 mb-4 border-b border-gray-600 pb-2">
                            SELECT PAYMENT METHOD
                        </div>
                        <button onMouseEnter={() => sfx.playHover()} onClick={() => handleCheckout('APPLE')} className="w-full bg-black border-2 border-white hover:border-yellow-400 p-3 flex items-center justify-between group">
                            <span className="font-mono text-white group-hover:text-yellow-400"> APPLE PAY</span>
                            <span className="text-xs text-green-400">INSTANT</span>
                        </button>
                        <button onMouseEnter={() => sfx.playHover()} onClick={() => handleCheckout('GOOGLE')} className="w-full bg-black border-2 border-white hover:border-yellow-400 p-3 flex items-center justify-between group">
                            <span className="font-mono text-white group-hover:text-yellow-400">G GOOGLE PAY</span>
                            <span className="text-xs text-green-400">INSTANT</span>
                        </button>
                        <button onMouseEnter={() => sfx.playHover()} onClick={() => handleCheckout('CARD')} className="w-full bg-black border-2 border-white hover:border-yellow-400 p-3 flex items-center justify-between group">
                            <span className="font-mono text-white group-hover:text-yellow-400">💳 CREDIT CARD</span>
                            <span className="text-xs text-gray-400">SECURE</span>
                        </button>
                    </div>
                )}

                {checkoutStep === 'PROCESSING' && (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <div className="font-pixel text-blue-400 text-center animate-pulse">
                            PROCESSING TRANSACTION...
                            <br/>
                            <span className="text-xs font-mono text-gray-400">Verifying Inventory</span>
                        </div>
                    </div>
                )}

                {checkoutStep === 'CONFIRMED' && (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                        <div className="text-6xl text-green-500 animate-bounce">✓</div>
                        <div className="font-pixel text-green-400 text-center">
                            ORDER CONFIRMED!
                            <br/>
                            <span className="text-xs font-mono text-white">Stock Reserved.</span>
                        </div>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default LiveProductScreen;

