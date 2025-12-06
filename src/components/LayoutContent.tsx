"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { useShop } from '../context/ShopContext';
import Navigation from './Navigation';

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { hasSeenIntro } = useShop();
  const pathname = usePathname();

  // Determine if we should show navigation
  // We show it if:
  // 1. User has seen intro
  // 2. OR user is NOT on the home page (other pages shouldn't be blocked by intro logic unless intended)
  // However, if we want strict intro enforcement, we might want to check that.
  // For now, let's assume we show nav unless we are on home AND haven't seen intro.
  
  const showNav = hasSeenIntro || pathname !== '/';

  return (
    <>
      {showNav && <Navigation />}
      {children}
    </>
  );
};

export default LayoutContent;

