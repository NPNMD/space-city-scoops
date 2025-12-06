"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type GamePhase = 'PRE_DROP' | 'DROP_LIVE' | 'POST_DROP';

interface GameContextType {
  phase: GamePhase;
  stock: number;
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
  email: string;
  setEmail: (email: string) => void;
  startGame: () => void;
  attack: (damage: number) => void;
  resetGame: () => void;
  setPhase: (phase: GamePhase) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [phase, setPhase] = useState<GamePhase>('PRE_DROP');
  const [stock, setStock] = useState(100); // Boss Health
  const [email, setEmail] = useState('');
  
  // Mock Countdown Timer (e.g., 2 days from now)
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 33, seconds: 0 });

  useEffect(() => {
    // Simple countdown logic simulation
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const startGame = () => {
    setPhase('DROP_LIVE');
  };

  const attack = (damage: number) => {
    setStock(prev => {
      const newStock = Math.max(0, prev - damage);
      if (newStock === 0) {
        setTimeout(() => setPhase('POST_DROP'), 1500); // Delay for death animation
      }
      return newStock;
    });
  };

  const resetGame = () => {
    setStock(100);
    setPhase('PRE_DROP');
    setEmail('');
  };

  return (
    <GameContext.Provider value={{ 
      phase, 
      stock, 
      timeLeft, 
      email, 
      setEmail, 
      startGame, 
      attack, 
      resetGame,
      setPhase // Exposed for testing/demo purposes
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

