"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShop } from '../context/ShopContext';
import Image from 'next/image';

const Navigation = () => {
  const pathname = usePathname();
  const { user, login, getCartItemCount } = useShop();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const cartCount = getCartItemCount();

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/shop', label: 'SHOP' },
    { href: '/archive', label: 'ARCHIVE' },
    { href: '/about', label: 'ABOUT' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-snes-black border-b-4 border-gray-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Image 
              src="/assets/logo.png" 
              alt="Space City Scoops" 
              width={120} 
              height={40} 
              className="pixel-art"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 font-pixel text-sm border-2 transition-all ${
                  isActive(link.href)
                    ? 'bg-snes-blue border-yellow-400 text-yellow-400'
                    : 'border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/cart"
                  className="relative px-3 py-2 font-pixel text-xs border-2 border-gray-600 hover:border-yellow-400 transition-colors"
                >
                  <span className="hidden sm:inline">CART</span>
                  <span className="sm:hidden">🛒</span>
                  {cartCount > 0 && (
                    <span className="ml-1 sm:ml-0 sm:absolute sm:-top-1 sm:-right-1 bg-red-500 text-white text-[10px] rounded-full px-1 sm:w-5 sm:h-5 flex items-center justify-center border-2 border-black">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 px-3 py-2 font-pixel text-xs border-2 border-gray-600 hover:border-yellow-400 transition-colors"
                >
                  <Image 
                    src="/assets/astronaut.png" 
                    alt="Profile" 
                    width={24} 
                    height={24} 
                    className="pixel-art"
                  />
                  <span className="hidden md:inline">{user.displayName?.split(' ')[0] || 'PILOT'}</span>
                </Link>
              </>
            ) : (
              <button
                onClick={login}
                className="px-4 py-2 font-pixel text-xs bg-blue-600 hover:bg-blue-500 border-2 border-blue-800 transition-colors"
              >
                LOGIN
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden px-3 py-2 font-pixel text-xs border-2 border-gray-600"
            >
              MENU
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t-2 border-gray-600 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setShowMobileMenu(false)}
                className={`block px-4 py-2 font-pixel text-sm border-2 ${
                  isActive(link.href)
                    ? 'bg-snes-blue border-yellow-400 text-yellow-400'
                    : 'border-gray-600 text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
