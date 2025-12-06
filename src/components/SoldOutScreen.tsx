"use client";

import React from 'react';
import { useShop } from '../context/ShopContext';

const SoldOutScreen = () => {
  const { resetDrop, timeLeft } = useShop();

  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center animate-fade-in">
      <h1 className="text-6xl md:text-8xl font-pixel text-red-600 drop-shadow-[4px_4px_0_rgba(255,255,255,0.2)]">
        SOLD OUT
      </h1>
      <p className="font-mono text-2xl text-red-400 animate-pulse">
        THIS DROP IS COMPLETE
      </p>

      <div className="bg-black border-4 border-gray-600 p-8 rounded-lg mt-8 max-w-lg">
        <p className="font-pixel text-yellow-400 text-xl mb-4">
          NEXT FLAVOR DROPS IN:
        </p>
        <div className="font-mono text-3xl text-white mb-6">
          {String(timeLeft.days).padStart(2, '0')}d : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m
        </div>
        
        <p className="text-gray-400 font-mono text-sm mb-4">
          Join our waitlist to get notified when the next limited edition drops
        </p>
        
        <input 
          type="email" 
          placeholder="ENTER EMAIL ADDRESS"
          className="bg-gray-900 border-2 border-yellow-400 text-white font-mono text-lg p-3 w-full mb-4 focus:outline-none focus:border-white"
        />
        <button 
          className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-pixel py-3 rounded transition-colors"
          onClick={() => alert("Subscribed for next drop!")}
        >
          NOTIFY ME
        </button>
      </div>

      <button 
        onClick={resetDrop}
        className="text-gray-500 font-mono hover:text-white mt-12 underline text-sm"
      >
        [ ADMIN: RESET DROP ]
      </button>
    </div>
  );
};

export default SoldOutScreen;

