"use client";

import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import TitleScreen from '../components/TitleScreen';
import LiveProductScreen from '../components/LiveProductScreen';
import SoldOutScreen from '../components/SoldOutScreen';
import Background from '../components/Background';
import IntroScreen from '../components/IntroScreen';

const ShopContainer = () => {
  const { dropPhase } = useShop();

  return (
    <>
      {dropPhase === 'PRE_DROP' && <TitleScreen />}
      {dropPhase === 'DROP_LIVE' && <LiveProductScreen />}
      {dropPhase === 'POST_DROP' && <SoldOutScreen />}
    </>
  );
};

export default function Home() {
  const { dropPhase, hasSeenIntro, markIntroSeen } = useShop();

  return (
    <>
      {!hasSeenIntro ? (
        <IntroScreen onComplete={markIntroSeen} />
      ) : (
        <>
          <div className="fixed inset-0 overflow-hidden">
            <Background />
          </div>
          <div className="relative z-10 h-screen flex flex-col items-center justify-center">
            <ShopContainer />
          </div>
        </>
      )}
    </>
  );
}
