"use client";

import React from 'react';
import { useShop, Order } from '../../context/ShopContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import Background from '../../components/Background';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';

const OrderItem = ({ order }: { order: Order }) => {
  return (
    <div className="border-2 border-gray-700 bg-gray-900 bg-opacity-80 p-4 mb-4 font-mono text-sm">
      <div className="flex justify-between items-center mb-2 border-b border-gray-700 pb-2">
        <span className="text-gray-400">ORDER #{order.id.slice(-6).toUpperCase()}</span>
        <span className="text-gray-500">{new Date(order.timestamp).toLocaleDateString()}</span>
      </div>
      <div className="space-y-2">
        {order.items.map((item, idx) => (
          <div key={`${order.id}-item-${idx}`} className="flex justify-between items-center">
             <div className="flex items-center space-x-2">
                <span className="text-yellow-400">{item.quantity}x</span>
                <span className="text-white">{item.name}</span>
             </div>
             <span className="text-gray-400">${item.price * item.quantity}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-700">
          <span className="text-green-400 font-pixel text-xs">STATUS: {order.status.toUpperCase()}</span>
          <span className="text-yellow-400 font-pixel text-lg">TOTAL: ${order.total}</span>
      </div>
    </div>
  );
};

const ProfileContent = () => {
  const { user, userProfile, userOrders, authLoading } = useShop();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [authLoading, user, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center h-full pt-16">
        <p className="text-white font-pixel">Loading...</p>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 border-4 border-yellow-400 rounded-lg p-2 bg-black bg-opacity-50">
            <Image
              src="/assets/astronaut.png"
              alt="Profile"
              width={128}
              height={128}
              className="pixel-art w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-pixel text-yellow-400 mb-2 tracking-widest">
            {user.displayName?.toUpperCase() || 'PILOT'}
          </h1>
          <div className="inline-block bg-blue-900 border border-blue-500 px-3 py-1 rounded mb-2">
             <p className="font-pixel text-xs md:text-sm text-blue-200">RANK: {userProfile?.rank || 'ROOKIE'}</p>
          </div>
          <p className="font-mono text-gray-400 text-sm">{user.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
          <div className="border-2 border-gray-700 bg-black bg-opacity-90 p-4 md:p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-2xl md:text-4xl font-pixel text-green-400">{userProfile?.missionsCompleted || 0}</div>
            <div className="font-mono text-gray-500 text-xs md:text-sm mt-2">MISSIONS</div>
          </div>
          <div className="border-2 border-gray-700 bg-black bg-opacity-90 p-4 md:p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-2xl md:text-4xl font-pixel text-blue-400">{userProfile?.flavorsCollected || 0}</div>
            <div className="font-mono text-gray-500 text-xs md:text-sm mt-2">BAGS</div>
          </div>
          <div className="border-2 border-gray-700 bg-black bg-opacity-90 p-4 md:p-6 text-center transform hover:scale-105 transition-transform">
            <div className="text-2xl md:text-4xl font-pixel text-yellow-400">${userProfile?.totalSpent || 0}</div>
            <div className="font-mono text-gray-500 text-xs md:text-sm mt-2">DONATED</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
             {/* Account Info */}
            <div className="border-4 border-gray-600 bg-black bg-opacity-90 p-6 md:p-8 h-fit">
            <h2 className="text-xl md:text-2xl font-pixel text-yellow-400 mb-6 border-b-4 border-gray-700 pb-2">DATA LOG</h2>
            <div className="space-y-4 font-mono text-sm md:text-base">
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="text-gray-500">PILOT ID:</span>
                    <span className="text-white font-mono text-xs">{user.uid.slice(0, 8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="text-gray-500">JOINED:</span>
                    <span className="text-white">{userProfile?.joinedAt ? new Date(userProfile.joinedAt).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                    <span className="text-gray-500">STATUS:</span>
                    <span className="text-green-400 font-pixel text-xs animate-pulse">ACTIVE</span>
                </div>
                <div className="pt-4">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-900/50 hover:bg-red-600 text-red-200 hover:text-white font-pixel py-3 px-4 border border-red-800 transition-all text-sm"
                    >
                        TERMINATE SESSION (LOGOUT)
                    </button>
                </div>
            </div>
            </div>

            {/* Order History */}
            <div className="border-4 border-gray-600 bg-black bg-opacity-90 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-pixel text-yellow-400 mb-6 border-b-4 border-gray-700 pb-2">MISSION HISTORY</h2>
            
            {userOrders.length > 0 ? (
                <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {userOrders.map((order) => (
                        <OrderItem key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border-2 border-dashed border-gray-800">
                    <p className="font-mono text-gray-500 mb-2">NO MISSIONS LOGGED</p>
                    <p className="font-mono text-gray-600 text-xs">
                    Engage in battle to create history.
                    </p>
                </div>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  return (
    <>
      <Background />
      <ProfileContent />
    </>
  );
}
