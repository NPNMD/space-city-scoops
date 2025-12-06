"use client";

import React, { useEffect, useState } from 'react';
import { sfx } from '../lib/audio';

const IntroScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    // Play intro sound
    const playIntro = async () => {
      try {
        await sfx.playIntro();
      } catch (e) {
        console.error("Audio autoplay failed", e);
      }
    };
    playIntro();

    // Auto-complete after animation (60s defined in CSS, but text is short, so maybe 40s is enough to read)
    const timer = setTimeout(() => {
      handleSkip();
    }, 50000); 

    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    setFaded(true);
    setTimeout(onComplete, 1000); // Wait for fade out
  };

  return (
    <div className={`fixed inset-0 bg-black z-50 transition-opacity duration-1000 ${faded ? 'opacity-0' : 'opacity-100'}`}>
      <div className="perspective-1000 w-full h-full overflow-hidden relative">
        {/* Starfield Background */}
        <div className="absolute inset-0 z-0">
            <div className="stars-sm"></div>
            <div className="stars-md"></div>
        </div>

        {/* Crawl Container */}
        <div className="crawl-container z-10" onClick={handleSkip}>
          <div className="crawl-text">
            <div className="crawl-title">EPISODE I</div>
            <div className="crawl-subtitle">THE FLAVOR AWAKENS</div>
            
            <p className="mb-8">It is a time of snacking despair.</p>
            
            <p className="mb-8">Traditional ice cream melts too fast, leaving a galaxy of sticky fingers.</p>
            
            <p className="mb-8">But a new force has emerged...</p>
            
            <p className="mb-8 text-center text-white">SPACE CITY SCOOPS</p>
            
            <p className="mb-8">Harnessing advanced freeze-drying technology to preserve flavor at absolute zero.</p>
            
            <p className="mb-8">No water. Maximum crunch. Intense taste.</p>
            
            <p className="mb-8">The drop is imminent.</p>
            
            <p className="mb-8">Secure your bag before it vanishes into the void.</p>
          </div>
        </div>

        {/* Skip Button */}
        <button 
            onClick={handleSkip}
            className="absolute bottom-8 right-8 z-50 text-yellow-400 font-pixel text-xl border-2 border-yellow-400 px-6 py-2 rounded hover:bg-yellow-400 hover:text-black transition-colors animate-pulse"
        >
            SKIP INTRO »
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
