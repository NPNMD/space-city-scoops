"use client";

import React from 'react';
import Background from '../../components/Background';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Background />
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-pixel text-yellow-400 mb-4">
              ABOUT SPACE CITY SCOOPS
            </h1>
            <div className="w-32 h-32 mx-auto mb-8">
              <Image
                src="/assets/logo.png"
                alt="Space City Scoops"
                width={128}
                height={128}
                className="pixel-art"
              />
            </div>
          </div>

          {/* Mission Statement */}
          <div className="border-4 border-gray-600 bg-black bg-opacity-90 p-8 rounded-lg">
            <h2 className="text-3xl font-pixel text-green-400 mb-4">OUR MISSION</h2>
            <p className="font-mono text-gray-300 text-lg leading-relaxed">
              Space City Scoops is on a mission to revolutionize the freeze-dried ice cream experience. 
              We combine cutting-edge freeze-drying technology with limited edition, artisanal flavors 
              inspired by the cosmos. Each drop is a battle against time—once they're gone, they're gone forever.
            </p>
          </div>

          {/* The Process */}
          <div className="border-4 border-gray-600 bg-black bg-opacity-90 p-8 rounded-lg">
            <h2 className="text-3xl font-pixel text-blue-400 mb-4">THE PROCESS</h2>
            <div className="space-y-4 font-mono text-gray-300">
              <div className="flex items-start space-x-4">
                <span className="text-yellow-400 font-pixel text-2xl">1.</span>
                <div>
                  <h3 className="text-yellow-400 font-pixel mb-2">FLAVOR CREATION</h3>
                  <p>Our team of flavor scientists craft unique, limited edition recipes inspired by cosmic phenomena.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-yellow-400 font-pixel text-2xl">2.</span>
                <div>
                  <h3 className="text-yellow-400 font-pixel mb-2">FREEZE-DRYING</h3>
                  <p>Using advanced freeze-drying technology, we preserve the flavor and texture while creating a lightweight, shelf-stable product.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-yellow-400 font-pixel text-2xl">3.</span>
                <div>
                  <h3 className="text-yellow-400 font-pixel mb-2">LIMITED DROPS</h3>
                  <p>Each flavor is released in limited quantities. When stock runs out, that flavor is retired forever—creating true FOMO.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-yellow-400 font-pixel text-2xl">4.</span>
                <div>
                  <h3 className="text-yellow-400 font-pixel mb-2">THE BATTLE</h3>
                  <p>Watch in real-time as limited stock depletes. Every purchase is a strike against the flavor boss!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Freeze-Dried */}
          <div className="border-4 border-gray-600 bg-black bg-opacity-90 p-8 rounded-lg">
            <h2 className="text-3xl font-pixel text-purple-400 mb-4">WHY FREEZE-DRIED?</h2>
            <div className="grid md:grid-cols-2 gap-6 font-mono text-gray-300">
              <div>
                <h3 className="text-purple-400 font-pixel mb-2">LIGHTWEIGHT</h3>
                <p>Perfect for space travel, hiking, or just snacking without the mess.</p>
              </div>
              <div>
                <h3 className="text-purple-400 font-pixel mb-2">SHELF-STABLE</h3>
                <p>No freezer required. Store at room temperature for 2+ years.</p>
              </div>
              <div>
                <h3 className="text-purple-400 font-pixel mb-2">FULL FLAVOR</h3>
                <p>Freeze-drying preserves the original taste and texture of premium ice cream.</p>
              </div>
              <div>
                <h3 className="text-purple-400 font-pixel mb-2">UNIQUE TEXTURE</h3>
                <p>Experience the satisfying crunch and melt-in-your-mouth sensation.</p>
              </div>
            </div>
          </div>

          {/* The Team */}
          <div className="border-4 border-gray-600 bg-black bg-opacity-90 p-8 rounded-lg">
            <h2 className="text-3xl font-pixel text-pink-400 mb-4">THE TEAM</h2>
            <p className="font-mono text-gray-300 text-lg leading-relaxed">
              We're a team of flavor enthusiasts, space nerds, and game developers based in Houston, Texas—Space City. 
              Our mission is to bring the excitement of limited drops and gaming culture to the world of freeze-dried ice cream.
            </p>
          </div>

          {/* Contact */}
          <div className="border-4 border-yellow-400 bg-black bg-opacity-90 p-8 rounded-lg text-center">
            <h2 className="text-3xl font-pixel text-yellow-400 mb-4">QUESTIONS?</h2>
            <p className="font-mono text-gray-300 mb-4">
              Reach out to us at <span className="text-yellow-400">mission@spacecityscoops.com</span>
            </p>
            <p className="font-pixel text-sm text-gray-500">
              Follow us for drop announcements and flavor previews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

