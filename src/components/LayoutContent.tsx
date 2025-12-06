"use client";

import React from 'react';
import Navigation from './Navigation';

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  // Navigation should always be visible for accessibility and usability
  // The intro logic is separate and should not hide the navigation
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default LayoutContent;

