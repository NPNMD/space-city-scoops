"use client";

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Image from 'next/image';

const BattleScreen = () => {
  const { stock, attack, phase } = useGame();
  const [showMenu, setShowMenu] = useState(false);
  const [damageAnim, setDamageAnim] = useState(false);

  const handleAttackClick = () => {
    setShowMenu(true);
  };

  const handleCheckout = (method: string) => {
    // Play attack sound
    setDamageAnim(true);
    setTimeout(() => setDamageAnim(false), 500);
    attack(10); // Simulate selling 10 bags
    setShowMenu(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col relative">
      {/* HUD */}
      <div className="flex justify-between items-start p-4 w-full absolute top-0 left-0 z-20">
        {/* Player Info */}
        <div className="flex items-center space-x-2 bg-snes-blue border-2 border-white p-2 rounded">
            <Image src="/assets/astronaut.png" alt="P1" width={40} height={40} className="pixel-art border border-white" />
            <div className="text-white font-mono text-sm leading-tight">
                <p className="text-yellow-400">PLAYER 1</p>
                <p>LVL 1</p>
            </div>
        </div>

        {/* Boss HP Bar */}
        <div className="w-1/2 md:w-1/3">
            <div className="flex justify-between text-white font-pixel text-xs mb-1">
                <span>FLAVOR BOSS</span>
                <span>HP: {stock}/100</span>
            </div>
            <div className="w-full h-6 bg-gray-800 border-2 border-white relative">
                <div 
                    className={`h-full transition-all duration-300 ${stock < 30 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}
                    style={{ width: `${stock}%` }}
                ></div>
            </div>
        </div>
      </div>

      {/* Battle Arena (Center) */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Boss Sprite */}
        <div className={`relative transition-transform duration-100 ${damageAnim ? 'translate-x-2 translate-y-[-2px] brightness-150' : 'animate-bounce-slow'}`}>
            <Image 
                src="/assets/boss.png" 
                alt="Flavor Boss" 
                width={256} 
                height={256} 
                className="pixel-art drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            />
             {damageAnim && (
                <div className="absolute top-0 right-0 text-red-500 font-pixel text-4xl animate-ping">
                    -10
                </div>
            )}
        </div>

        {/* Boss Stats */}
        <div className="absolute right-4 md:right-20 top-1/3 bg-snes-blue border-2 border-white p-4 font-mono text-green-400 text-sm md:text-lg shadow-lg opacity-80">
            <p>CRUNCH: 99</p>
            <p>SWEET: MAX</p>
            <p>RARITY: LEGENDARY</p>
        </div>
      </div>

      {/* Control Panel (Bottom) */}
      <div className="pb-8 w-full flex justify-center relative z-30">
        {!showMenu ? (
             <button 
                onClick={handleAttackClick}
                className="bg-red-600 hover:bg-red-500 text-white font-pixel text-xl md:text-3xl py-6 px-12 rounded-lg border-b-8 border-red-900 active:border-b-0 active:translate-y-2 shadow-[0_0_30px_rgba(255,0,0,0.6)] animate-pulse"
            >
                PRESS START TO ATTACK ($20)
            </button>
        ) : (
            <div className="bg-blue-800 border-4 border-white p-2 rounded-lg w-full max-w-md shadow-2xl">
                <div className="bg-blue-900 border-2 border-blue-700 p-4 space-y-2 font-mono text-xl text-white">
                    <button onClick={() => handleCheckout('APPLE')} className="block w-full text-left hover:bg-yellow-500 hover:text-black px-2 py-1">> APPLE PAY (CRITICAL!)</button>
                    <button onClick={() => handleCheckout('GOOGLE')} className="block w-full text-left hover:bg-yellow-500 hover:text-black px-2 py-1">> GOOGLE PAY (CRITICAL!)</button>
                    <button onClick={() => handleCheckout('CARD')} className="block w-full text-left hover:bg-yellow-500 hover:text-black px-2 py-1">> CARD INPUT</button>
                    <button onClick={() => setShowMenu(false)} className="block w-full text-left hover:bg-red-500 hover:text-white px-2 py-1">> RUN AWAY</button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default BattleScreen;

