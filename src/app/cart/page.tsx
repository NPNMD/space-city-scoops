"use client";

import React from 'react';
import { useShop } from '../../context/ShopContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Background from '../../components/Background';

const CartContent = () => {
  const { user, cart, removeFromCart, updateCartItemQuantity, getCartTotal, clearCart, checkoutUrl, isCartLoading } = useShop();
  const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/');
  //   }
  // }, [user, router]);

  // if (!user) {
  //   return (
  //     <div className="flex items-center justify-center h-full pt-16">
  //       <p className="text-white font-pixel">Redirecting to login...</p>
  //     </div>
  //   );
  // }

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="pt-20 pb-16 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-pixel text-yellow-400 mb-2">
            SHOPPING CART
          </h1>
          <Link 
            href="/shop"
            className="font-mono text-gray-400 hover:text-yellow-400 transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart */
          <div className="border-4 border-gray-600 bg-black bg-opacity-90 p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-pixel text-gray-400 mb-4">YOUR CART IS EMPTY</h2>
            <p className="font-mono text-gray-500 mb-8">
              Add some limited edition flavors to get started!
            </p>
            <Link
              href="/shop"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-pixel py-3 px-8 border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all"
            >
              BROWSE SHOP
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border-4 border-gray-600 bg-black bg-opacity-90 p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6"
                >
                  <div className="w-24 h-24 border-2 border-gray-700 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="pixel-art object-contain w-full h-full"
                    />
                  </div>
                  <div className="flex-1 w-full md:w-auto">
                    <h3 className="font-pixel text-lg text-white mb-2">{item.name}</h3>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-gray-400">Qty:</span>
                        <button
                          onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 font-pixel border-2 border-gray-600 hover:border-yellow-400 text-white"
                        >
                          -
                        </button>
                        <span className="font-pixel text-white w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 font-pixel border-2 border-gray-600 hover:border-yellow-400 text-white"
                        >
                          +
                        </button>
                        <span className="font-mono text-gray-400 ml-2">× ${item.price}</span>
                      </div>
                      <div className="font-pixel text-yellow-400 text-xl">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="font-pixel text-red-400 hover:text-red-300 px-4 py-2 border-2 border-red-600 hover:border-red-500 transition-colors"
                  >
                    REMOVE
                  </button>
                </div>
              ))}
              
              {/* Clear Cart Button */}
              {cart.length > 0 && (
                <div className="flex justify-end pt-4">
                  <button
                    onClick={clearCart}
                    className="font-pixel text-gray-400 hover:text-red-400 px-4 py-2 border-2 border-gray-600 hover:border-red-600 transition-colors text-sm"
                  >
                    CLEAR CART
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="border-4 border-gray-600 bg-black bg-opacity-90 p-6 sticky top-24">
                <h2 className="text-2xl font-pixel text-yellow-400 mb-6">ORDER SUMMARY</h2>
                
                <div className="space-y-3 font-mono mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping:</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3 flex justify-between text-yellow-400 font-pixel text-xl">
                    <span>TOTAL:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (checkoutUrl) window.location.href = checkoutUrl;
                  }}
                  disabled={isCartLoading || !checkoutUrl}
                  className={`w-full ${isCartLoading ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-500'} text-white font-pixel py-4 px-8 border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all text-lg mb-4`}
                >
                  {isCartLoading ? 'LOADING...' : 'CHECKOUT NOW'}
                </button>

                <p className={`font-mono text-xs text-center ${shipping === 0 ? 'text-green-400' : 'text-gray-500'}`}>
                  {shipping === 0 ? '✓ FREE SHIPPING!' : `Free shipping on orders over $50`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function CartPage() {
  return (
    <>
      <Background />
      <CartContent />
    </>
  );
}

