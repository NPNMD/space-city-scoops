"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Background from '../../components/Background';
import { FLAVORS, Flavor } from '../../lib/flavors';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const VoteButton = ({ flavorId, flavorName }: { flavorId: string, flavorName: string }) => {
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVote = async () => {
    if (voted || loading) return;
    setLoading(true);

    try {
      // Optimistic UI update
      setVoted(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem(`vote_${flavorId}`, 'true');
      }

      // Fire and forget (or await if critical)
      await addDoc(collection(db, 'votes'), {
        flavorId,
        flavorName,
        timestamp: serverTimestamp(),
        // user: 'anonymous' // or auth.currentUser.uid if available
      });
      
    } catch (error) {
      console.error("Vote failed:", error);
      // Revert if critical failure, but for simple voting usually fine to ignore
    } finally {
      setLoading(false);
    }
  };

  // Check local storage on mount (client-side only)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasVoted = localStorage.getItem(`vote_${flavorId}`);
      if (hasVoted) setVoted(true);
    }
  }, [flavorId]);

  return (
    <button
      onClick={handleVote}
      disabled={voted || loading}
      className={`mt-4 w-full font-pixel py-2 px-4 border-2 transition-all ${
        voted
          ? 'bg-green-600 border-green-400 text-white cursor-default'
          : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-yellow-400 hover:text-yellow-400'
      }`}
    >
      {loading ? 'TRANSMITTING...' : voted ? 'VOTE RECORDED' : 'VOTE TO RETURN'}
    </button>
  );
};

export default function ArchivePage() {
  const soldOutFlavors = FLAVORS.filter(f => f.status === 'SOLD_OUT');
  
  // Stats calculation
  const totalFlavors = FLAVORS.length;
  const liveCount = FLAVORS.filter(f => f.status === 'LIVE').length;
  const soldOutCount = soldOutFlavors.length;
  const upcomingCount = FLAVORS.filter(f => f.status === 'UPCOMING' || f.status === 'LOCKED').length;

  return (
    <div className="min-h-screen">
      <Background />
      <div className="pt-24 pb-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-pixel text-yellow-400 mb-4 drop-shadow-md">
              MISSION ARCHIVE
            </h1>
            <p className="font-mono text-gray-400 text-lg max-w-2xl mx-auto">
              Declassified log of completed missions. Vote for your favorite flavor to initiate a re-supply protocol.
            </p>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
            <div className="border-2 border-gray-700 bg-black bg-opacity-90 p-4 text-center rounded">
              <div className="text-3xl font-pixel text-yellow-400">{totalFlavors}</div>
              <div className="font-mono text-gray-400 text-xs md:text-sm mt-2">TOTAL MISSIONS</div>
            </div>
            <div className="border-2 border-gray-700 bg-black bg-opacity-90 p-4 text-center rounded">
              <div className="text-3xl font-pixel text-green-400">{liveCount}</div>
              <div className="font-mono text-gray-400 text-xs md:text-sm mt-2">ACTIVE NOW</div>
            </div>
            <div className="border-2 border-gray-700 bg-black bg-opacity-90 p-4 text-center rounded">
              <div className="text-3xl font-pixel text-red-400">{soldOutCount}</div>
              <div className="font-mono text-gray-400 text-xs md:text-sm mt-2">COMPLETED</div>
            </div>
            <div className="border-2 border-gray-700 bg-black bg-opacity-90 p-4 text-center rounded">
              <div className="text-3xl font-pixel text-purple-400">{upcomingCount}</div>
              <div className="font-mono text-gray-400 text-xs md:text-sm mt-2">SCHEDULED</div>
            </div>
          </div>

          {/* Archive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {soldOutFlavors.map((flavor) => (
              <div key={flavor.id} className="relative group border-4 border-gray-800 bg-black bg-opacity-90 p-6 rounded-lg flex flex-col items-center hover:border-gray-600 transition-all duration-300">
                
                {/* Status Stamp */}
                <div className="absolute top-4 right-4 z-20">
                   <div className="bg-red-900 text-red-300 font-pixel px-2 py-1 border border-red-700 text-xs transform rotate-3 opacity-80">
                      MISSION COMPLETE
                   </div>
                </div>

                {/* Image */}
                <div className="relative w-48 h-48 my-4 grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                  <Image
                    src={flavor.image}
                    alt={flavor.name}
                    fill
                    className="pixel-art object-contain"
                  />
                </div>

                {/* Content */}
                <div className="w-full text-center space-y-3">
                  <h3 className={`font-pixel text-xl ${flavor.colors.primary}`}>
                    {flavor.name.toUpperCase()}
                  </h3>
                  <p className="font-mono text-gray-500 text-sm h-12 overflow-hidden leading-tight">
                    {flavor.description}
                  </p>
                  
                  {/* Stats Mini */}
                  <div className="grid grid-cols-3 gap-2 text-[10px] font-mono border-t border-gray-800 pt-3 text-gray-600">
                    <div>CRUNCH: {flavor.stats.crunch}</div>
                    <div>SWEET: {flavor.stats.sweetness}</div>
                    <div>RARITY: {flavor.stats.rarity}</div>
                  </div>

                  {/* Voting Mechanism */}
                  <VoteButton flavorId={flavor.id} flavorName={flavor.name} />
                  
                  {flavor.soldOutTime && (
                    <div className="pt-2 text-[10px] font-mono text-gray-600">
                      SOLD OUT IN: {flavor.soldOutTime}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {soldOutFlavors.length === 0 && (
            <div className="text-center py-24 border-2 border-dashed border-gray-800 rounded-lg">
              <p className="font-pixel text-gray-600 text-xl">NO ARCHIVED MISSIONS FOUND</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
