"use client";

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import Image from 'next/image';

const TitleScreen = () => {
  const { timeLeft, setEmail, startGame } = useGame();
  const [inputEmail, setInputEmail] = useState('');
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputEmail) {
      setEmail(inputEmail);
      setIsReady(true);
      // Play "OK!" sound here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto space-y-12 text-center relative z-10">
      {/* Scrolling Starfield Background would be here via CSS in parent or layout */}
      
      {/* Logo */}
      <div className="animate-pulse drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
         <Image 
            src="/assets/logo.png" 
            alt="Space City Scoops" 
            width={600} 
            height={200} 
            className="pixel-art"
        />
      </div>

      {/* Countdown */}
      <div className="bg-snes-blue border-4 border-gray-400 p-6 rounded shadow-lg relative">
        <div className="absolute top-0 left-0 w-2 h-2 bg-white"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-white"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-white"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-white"></div>
        
        <p className="text-snes-gold font-pixel text-sm md:text-lg mb-4 blink">NEXT MISSION STARTS IN:</p>
        <div className="font-mono text-3xl md:text-5xl text-white tracking-widest">
            {String(timeLeft.days).padStart(2, '0')} : {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')}
        </div>
      </div>

      {/* Email / Start */}
      {!isReady ? (
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
            <label className="text-green-400 font-pixel text-xs md:text-sm animate-pulse">
                INSERT COIN (EMAIL) TO READY PLAYER ONE
            </label>
            <input 
                type="email" 
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                placeholder="ENTER EMAIL..."
                className="bg-black border-2 border-green-500 text-green-500 font-mono text-xl p-2 w-64 text-center focus:outline-none focus:border-green-300"
            />
            <button type="submit" className="hidden">Submit</button>
        </form>
      ) : (
        <div className="flex flex-col items-center space-y-4">
             <div className="flex items-center space-x-4">
                <Image src="/assets/astronaut.png" alt="Player 1" width={48} height={48} className="pixel-art" />
                <div className="bg-white text-black p-4 rounded font-pixel text-sm relative bubble-speech">
                    OK! READY FOR LAUNCH!
                </div>
             </div>
             <button 
                onClick={startGame}
                className="mt-8 bg-red-600 hover:bg-red-500 text-white border-b-4 border-red-800 active:border-b-0 active:translate-y-1 font-pixel py-4 px-8 rounded text-xl shadow-[0_0_20px_rgba(255,0,0,0.5)]"
            >
                START MISSION NOW
                <br/>
                <span className="text-xs opacity-75">(DEMO MODE)</span>
            </button>
        </div>
      )}
    </div>
  );
};

export default TitleScreen;

