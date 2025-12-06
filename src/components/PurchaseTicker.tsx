"use client";

import React, { useState, useEffect } from 'react';

interface PurchaseEvent {
  timestamp: number;
  location?: string;
  count: number;
  id: string;
}

interface PurchaseTickerProps {
  recentPurchases: PurchaseEvent[];
}

const PurchaseTicker: React.FC<PurchaseTickerProps> = ({ recentPurchases }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Generate ticker messages from purchase events
  const generateMessages = (): string[] => {
    if (recentPurchases.length === 0) {
      return ['🚀 Be the first to secure your bag!'];
    }

    const messages: string[] = [];
    const now = Date.now();

    // Add individual purchase messages
    recentPurchases.slice(-10).reverse().forEach(purchase => {
      const timeAgo = Math.floor((now - purchase.timestamp) / 1000);
      const bags = purchase.count === 1 ? '1 bag' : `${purchase.count} bags`;
      
      if (timeAgo < 10) {
        messages.push(`⚡ Player in ${purchase.location} just secured ${bags}!`);
      } else if (timeAgo < 30) {
        messages.push(`🚀 ${purchase.location} player grabbed ${bags}!`);
      } else {
        messages.push(`🔥 Player in ${purchase.location} bought ${bags}!`);
      }
    });

    // Add aggregate messages if there's activity
    if (recentPurchases.length >= 3) {
      const last60Seconds = recentPurchases.filter(
        p => now - p.timestamp < 60000
      ).length;
      
      if (last60Seconds >= 3) {
        messages.push(`🔥 ${last60Seconds} bags sold in last 60 seconds!`);
      }
    }

    // Add urgency messages based on recent activity
    if (recentPurchases.length >= 5) {
      messages.push('⚠️ STOCK MOVING FAST!');
    }

    return messages.length > 0 ? messages : ['🚀 Join the action!'];
  };

  const messages = generateMessages();

  // Auto-advance ticker every 4 seconds
  useEffect(() => {
    if (messages.length <= 1) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 300); // Match slide-out animation duration
    }, 4000);

    return () => clearInterval(interval);
  }, [messages.length]);

  // Reset index when messages change
  useEffect(() => {
    setCurrentIndex(0);
    setIsVisible(true);
  }, [recentPurchases.length]);

  const currentMessage = messages[currentIndex] || messages[0];

  // Determine color based on message content
  const getMessageColor = () => {
    if (currentMessage.includes('⚡') || currentMessage.includes('just')) {
      return 'text-yellow-300';
    }
    if (currentMessage.includes('🔥') || currentMessage.includes('FAST')) {
      return 'text-red-400';
    }
    return 'text-green-400';
  };

  return (
    <div className="w-full bg-black bg-opacity-80 border-y-2 border-cyan-400 py-2 px-4 overflow-hidden relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-shimmer"></div>
      
      {/* Ticker content */}
      <div className="relative z-10 flex items-center justify-center">
        <div className={`font-pixel text-sm md:text-lg ${getMessageColor()} transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          {currentMessage}
        </div>
        
        {/* Pagination dots */}
        {messages.length > 1 && (
          <div className="absolute right-2 flex space-x-1">
            {messages.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-cyan-400 scale-125' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Side decorations */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-cyan-500/20 to-transparent"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-cyan-500/20 to-transparent"></div>
    </div>
  );
};

export default PurchaseTicker;