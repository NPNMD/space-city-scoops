"use client";

import React from 'react';
import { useGame } from '../context/GameContext';

const GameOverScreen = () => {
  const { setEmail, resetGame } = useGame();

  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-pixel text-red-600 drop-shadow-[4px_4px_0_rgba(255,255,255,0.2)]">
            GAME OVER
        </h1>
        <p className="font-mono text-2xl text-red-400 blink">
            MISSION FAILED: STOCK DEPLETED
        </p>

        <div className="bg-black border-4 border-gray-600 p-8 rounded-lg mt-8">
            <p className="font-pixel text-yellow-400 text-xl mb-4">CONTINUE? 9... 8... 7...</p>
            <input 
                type="email" 
                placeholder="INSERT EMAIL TO RETRY NEXT WEEK"
                className="bg-gray-900 border-b-2 border-yellow-400 text-white font-mono text-xl p-2 w-full mb-4 focus:outline-none"
            />
            <button 
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-pixel py-2 rounded"
                onClick={() => alert("Subscribed for next drop!")}
            >
                INSERT COIN
            </button>
        </div>

        <button 
            onClick={resetGame}
            className="text-gray-500 font-mono hover:text-white mt-12 underline"
        >
            [ ADMIN: RESET SIMULATION ]
        </button>
    </div>
  );
};

export default GameOverScreen;

