"use client";

import React from 'react';
import { GameProvider, useGame } from '../context/GameContext';
import TitleScreen from '../components/TitleScreen';
import BattleScreen from '../components/BattleScreen';
import GameOverScreen from '../components/GameOverScreen';

const GameContainer = () => {
  const { phase } = useGame();

  return (
    <>
      {phase === 'PRE_DROP' && <TitleScreen />}
      {phase === 'DROP_LIVE' && <BattleScreen />}
      {phase === 'POST_DROP' && <GameOverScreen />}
    </>
  );
};

export default function Home() {
  return (
    <GameProvider>
       <GameContainer />
    </GameProvider>
  );
}
