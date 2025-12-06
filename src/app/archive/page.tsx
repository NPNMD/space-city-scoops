"use client";

import React from 'react';
import Background from '../../components/Background';
import FlavorArchive from '../../components/FlavorArchive';
import { FLAVORS } from '../../lib/flavors';

export default function ArchivePage() {
  const soldOutFlavors = FLAVORS.filter(f => f.status === 'SOLD_OUT');
  const upcomingFlavors = FLAVORS.filter(f => f.status === 'UPCOMING' || f.status === 'LOCKED');

  return (
    <div className="min-h-screen">
      <Background />
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-pixel text-yellow-400 mb-4">
              MISSION ARCHIVE
            </h1>
            <p className="font-mono text-gray-400 text-lg">
              A complete log of all past, present, and future flavor missions
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="border-2 border-gray-700 bg-black bg-opacity-90 p-4 text-center">
              <div className="text-3xl font-pixel text-yellow-400">{FLAVORS.length}</div>
              <div className="font-mono text-gray-400 text-sm mt-2">TOTAL FLAVORS</div>
            </div>
            <div className="border-2 border-gray-700 bg-black bg-opacity-90 p-4 text-center">
              <div className="text-3xl font-pixel text-green-400">1</div>
              <div className="font-mono text-gray-400 text-sm mt-2">LIVE NOW</div>
            </div>
            <div className="border-2 border-gray-700 bg-black bg-opacity-90 p-4 text-center">
              <div className="text-3xl font-pixel text-red-400">{soldOutFlavors.length}</div>
              <div className="font-mono text-gray-400 text-sm mt-2">SOLD OUT</div>
            </div>
            <div className="border-2 border-gray-700 bg-black bg-opacity-90 p-4 text-center">
              <div className="text-3xl font-pixel text-purple-400">{upcomingFlavors.length}</div>
              <div className="font-mono text-gray-400 text-sm mt-2">UPCOMING</div>
            </div>
          </div>

          {/* Flavor Archive Component */}
          <FlavorArchive />

          {/* Legend */}
          <div className="mt-12 border-2 border-gray-700 bg-black bg-opacity-90 p-6 rounded-lg">
            <h2 className="text-2xl font-pixel text-yellow-400 mb-4">LEGEND</h2>
            <div className="grid md:grid-cols-3 gap-4 font-mono text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 border-2 border-white"></div>
                <span className="text-gray-300">LIVE - Available now</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-600 border-2 border-white"></div>
                <span className="text-gray-300">SOLD OUT - Mission complete</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-700 border-2 border-gray-500"></div>
                <span className="text-gray-300">UPCOMING - Future mission</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

