"use client";

import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import Image from 'next/image';
import { getCurrentFlavor } from '../lib/flavors';
import FlavorArchive from './FlavorArchive';
import { useRouter, usePathname } from 'next/navigation';
import { sfx } from '../lib/audio';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const TitleScreen = () => {
  const { timeLeft, viewLiveProduct, user, login, authLoading, email, setEmail } = useShop();
  const flavor = getCurrentFlavor();
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Handle redirect when user is logged in and auth finishes loading
  useEffect(() => {
    console.log('🔄 Auth/Redirect check:', { 
      user: !!user, 
      isRedirecting, 
      pathname, 
      authLoading,
      showLoading 
    });
    
    // Only proceed when auth has finished loading
    if (authLoading) {
      return; // Still loading, wait
    }
    
    // Clear loading state once auth is done
    if (showLoading) {
      console.log('✅ Clearing showLoading state');
      setShowLoading(false);
    }
    
    // If user is logged in and on home page, redirect to shop
    if (user && pathname === '/' && !isRedirecting) {
      console.log('✅ User logged in, redirecting to shop...');
      setIsRedirecting(true);
      const timer = setTimeout(() => {
        console.log('🚀 Executing redirect to /shop');
        router.push('/shop');
      }, 500); // Short delay for smooth transition
      return () => clearTimeout(timer);
    }
  }, [authLoading, user, pathname, isRedirecting, router, showLoading]);

  const handleLogin = async () => {
      console.group('🎯 Login Button Clicked');
      console.log('⏰ Timestamp:', new Date().toISOString());
      console.log('📍 Current URL:', window.location.href);
      (window as any).__loginStartTime = Date.now();
      
      sfx.playClick();
      setShowLoading(true);
      setLoginError(null);
      
      try {
        console.log('🚀 Calling login() function...');
        await login();
        console.log('✅ Login completed successfully');
        // Don't set showLoading to false here - let the redirect useEffect handle it
        // The auth state change will trigger the redirect, and showLoading will be managed there
      } catch (error: any) {
        // Login failed or cancelled
        console.group('❌ Login Error in UI Handler');
        console.error('Error code:', error?.code);
        console.error('Error message:', error?.message);
        console.error('Full error:', error);
        console.groupEnd();
        
        setShowLoading(false);
        const errorMessage = error?.message || 'Login failed. Please try again.';
        setLoginError(errorMessage);
        sfx.playError();
        // Clear error after 5 seconds
        setTimeout(() => setLoginError(null), 5000);
      }
      console.groupEnd();
  };

  const handleShopNow = () => {
    sfx.playClick();
    viewLiveProduct();
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || submitStatus === 'SUBMITTING') return;

    setSubmitStatus('SUBMITTING');
    sfx.playClick();

    try {
        await addDoc(collection(db, 'subscribers'), {
            email: emailInput,
            timestamp: Date.now(),
            source: 'landing_page_waitlist'
        });
        
        sfx.playSuccess();
        setSubmitStatus('SUCCESS');
        setEmail(emailInput);
        
        setTimeout(() => {
            setShowEmailForm(false);
            setSubmitStatus('IDLE');
        }, 2000);

    } catch (error) {
        console.error("Error saving email:", error);
        sfx.playError();
        setSubmitStatus('ERROR');
        setTimeout(() => setSubmitStatus('IDLE'), 2000);
    }
  };

  if (showLoading || authLoading) {
    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
             <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="text-yellow-400 font-pixel animate-pulse">AUTHENTICATING...</p>
             <p className="text-gray-500 font-mono text-xs mt-2">ESTABLISHING SECURE CONNECTION</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto space-y-6 md:space-y-12 text-center relative z-10 transition-opacity duration-500 py-8 px-4">
      
      {/* Logo */}
      <div className="animate-pulse drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] w-full flex flex-col items-center">
         <div className="relative w-full max-w-[280px] md:max-w-[600px] aspect-[3/1]">
            <Image 
                src="/assets/logo.png" 
                alt="Space City Scoops" 
                fill
                className="pixel-art object-contain"
                priority
            />
         </div>
        <h2 className="text-center text-snes-gold font-pixel text-[10px] md:text-sm mt-4 tracking-widest shadow-black drop-shadow-md px-4">
            LIMITED EDITION FREEZE-DRIED ICE CREAM DROPS
        </h2>
      </div>

      {/* Countdown */}
      <div className="bg-snes-blue border-4 border-gray-400 p-4 md:p-6 rounded shadow-lg relative w-full max-w-md mx-auto">
        <div className="absolute top-0 left-0 w-2 h-2 bg-white"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-white"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-white"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-white"></div>
        
        <p className="text-snes-gold font-pixel text-sm md:text-lg mb-4 blink">NEXT DROP STARTS IN:</p>
        <div className="font-mono text-3xl md:text-5xl text-white tracking-widest mb-2">
            {String(timeLeft.days).padStart(2, '0')} : {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <div className={`font-pixel text-sm ${flavor.colors.primary} animate-pulse`}>
           UPCOMING: {flavor.name.toUpperCase()}
        </div>
      </div>

      {/* Login / Start */}
      {!user ? (
        <div className="flex flex-col items-center space-y-6">
            {!showEmailForm ? (
                <>
                     <button 
                        onClick={() => { sfx.playClick(); setShowEmailForm(true); }}
                        onMouseEnter={() => sfx.playHover()}
                        className="bg-green-600 hover:bg-green-500 text-white font-pixel py-3 px-6 rounded border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transform hover:scale-105 transition-transform w-64"
                    >
                        JOIN WAITLIST
                    </button>
                    
                    <button 
                        onClick={handleLogin}
                        onMouseEnter={() => sfx.playHover()}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-pixel py-3 px-6 rounded border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 flex items-center justify-center space-x-2 transform hover:scale-105 transition-transform w-64"
                    >
                        <div className="w-6 h-6 relative">
                            <Image 
                                src="/assets/coin-icon.png" 
                                alt="Coin" 
                                fill
                                className="pixel-art object-contain"
                            />
                        </div>
                        <span>LOGIN / SIGNUP</span>
                    </button>
                    
                    {loginError && (
                        <div className="bg-red-900 border-2 border-red-400 p-4 text-center max-w-md animate-pulse">
                            <p className="text-red-400 font-pixel text-xs mb-1">AUTHENTICATION ERROR</p>
                            <p className="text-white font-mono text-xs">{loginError}</p>
                        </div>
                    )}
                </>
            ) : (
                <form onSubmit={handleEmailSubmit} className="flex flex-col space-y-4 w-72">
                    {submitStatus === 'SUCCESS' ? (
                        <div className="bg-green-900 border-2 border-green-400 p-4 text-center">
                            <p className="text-green-400 font-pixel text-sm mb-1">SUCCESS!</p>
                            <p className="text-white font-mono text-xs">You're on the list!</p>
                        </div>
                    ) : (
                        <>
                            <input 
                                type="email" 
                                placeholder="ENTER EMAIL ADDRESS"
                                value={emailInput}
                                onChange={(e) => { sfx.playType(); setEmailInput(e.target.value); }}
                                className="bg-black border-2 border-green-400 p-3 text-white font-mono text-center outline-none focus:border-white placeholder-gray-600"
                                autoFocus
                                disabled={submitStatus === 'SUBMITTING'}
                            />
                            <div className="flex space-x-2">
                                <button 
                                    type="button"
                                    onClick={() => { sfx.playError(); setShowEmailForm(false); }}
                                    className="flex-1 bg-gray-600 text-white font-pixel py-2 border-b-4 border-gray-800 active:border-b-0 active:translate-y-1"
                                    disabled={submitStatus === 'SUBMITTING'}
                                >
                                    CANCEL
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 bg-green-600 text-white font-pixel py-2 border-b-4 border-green-800 active:border-b-0 active:translate-y-1 disabled:opacity-50"
                                    disabled={submitStatus === 'SUBMITTING'}
                                >
                                    {submitStatus === 'SUBMITTING' ? 'SENDING...' : 'SUBMIT'}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            )}
            
            <p className="text-gray-500 font-mono text-xs max-w-md">
                By joining, you agree to receive drop notifications and marketing updates.
            </p>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
             <div className="flex items-center space-x-4">
                <Image src="/assets/astronaut.png" alt="Player 1" width={48} height={48} className="pixel-art" />
                <div className="bg-white text-black p-4 rounded font-pixel text-sm relative bubble-speech text-left">
                    <p>PILOT: {user.displayName?.toUpperCase() || 'UNKNOWN'}</p>
                    <p>STATUS: READY TO SHOP!</p>
                </div>
             </div>
             <button 
                onClick={handleShopNow}
                onMouseEnter={() => sfx.playHover()}
                className="mt-8 bg-red-600 hover:bg-red-500 text-white border-b-4 border-red-800 active:border-b-0 active:translate-y-1 font-pixel py-4 px-8 rounded text-xl shadow-[0_0_20px_rgba(255,0,0,0.5)]"
            >
                SHOP LIVE DROP
                <br/>
                <span className="text-xs opacity-75">(DEMO MODE)</span>
            </button>
        </div>
      )}

      {/* Flavor Archive (Bottom Section) */}
      <div className="w-full mt-16 border-t-2 border-gray-800 pt-8">
        <FlavorArchive />
      </div>
    </div>
  );
};

export default TitleScreen;
