"use client";

import React from 'react';
import Background from '../../components/Background';
import LiveProductScreen from '../../components/LiveProductScreen';
import { useShop } from '../../context/ShopContext';

export default function ShopPage() {
  const { authLoading } = useShop();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="font-pixel text-white animate-pulse">Loading Mission Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background />
      <div className="relative z-10 pt-20 h-screen flex flex-col">
        <LiveProductScreen />
      </div>
    </div>
  );
}
