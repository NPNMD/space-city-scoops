# Implementation Guide: Game-to-E-Commerce Transformation
## Space City Scoops - Developer Instructions

> **Purpose**: Transform the website from a gamified ice cream battle simulation into a professional e-commerce platform while maintaining the retro pixel art aesthetic.

---

## Table of Contents
1. [Overview](#overview)
2. [Terminology Mapping](#terminology-mapping)
3. [File-by-File Changes](#file-by-file-changes)
4. [Component Refactoring Priority](#component-refactoring-priority)
5. [State Management Changes](#state-management-changes)
6. [Asset Replacement Guide](#asset-replacement-guide)
7. [Testing Checklist](#testing-checklist)

---

## Overview

### What We're Changing
**FROM**: A space-themed ice cream battle game where users "attack" boss monsters  
**TO**: A premium e-commerce site for freeze-dried ice cream with limited drops

### What We're Keeping
- Retro pixel art aesthetic
- Real-time inventory tracking
- Limited edition drop mechanics
- User authentication
- Cart functionality
- Firebase integration

### Core Transformation Philosophy
**Every game mechanic becomes an e-commerce feature:**
- "Boss HP Bar" → Stock Level Indicator
- "Attack" → Purchase/Add to Cart
- "Battle Screen" → Live Product Showcase
- "Game Over" → Sold Out State
- "Missions" → Product Drops

---

## Terminology Mapping

### Critical Rename Table

| Current (Game) | New (E-Commerce) | Context |
|----------------|------------------|---------|
| `GameContext` | `ShopContext` | State management context |
| `GameProvider` | `ShopProvider` | Context provider component |
| `useGame()` | `useShop()` | Custom hook |
| `BattleScreen` | `LiveProductScreen` | Live drop showcase component |
| `GameOverScreen` | `SoldOutScreen` | Sold out state component |
| `attack()` | `purchaseProduct()` | Purchase action function |
| `startGame()` | `viewLiveProduct()` | Navigate to live product |
| `resetGame()` | `resetDrop()` | Admin function to reset inventory |
| `phase` | `dropPhase` | Drop lifecycle state |
| `stock` | `inventory` or keep as `stock` | Product availability |
| `GamePhase` | `DropPhase` | TypeScript type |
| Battle/Mission/Combat | Product/Shop/Purchase | UI copy |

---

## File-by-File Changes

### Priority 1: Core State Management

#### **File**: `src/context/GameContext.tsx`
**New Name**: `src/context/ShopContext.tsx`

**Changes Required**:

1. **Rename the file** from `GameContext.tsx` to `ShopContext.tsx`

2. **Update type definitions** (Lines 9-70):
```typescript
// BEFORE:
type GamePhase = 'PRE_DROP' | 'DROP_LIVE' | 'POST_DROP';

interface GameContextType {
  phase: GamePhase;
  startGame: () => void;
  attack: (damage: number) => void;
  resetGame: () => void;
  // ... other properties
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [phase, setPhase] = useState<GamePhase>('PRE_DROP');
  // ...
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

// AFTER:
type DropPhase = 'PRE_DROP' | 'DROP_LIVE' | 'POST_DROP';

interface ShopContextType {
  dropPhase: DropPhase;
  viewLiveProduct: () => void;
  purchaseProduct: (quantity: number) => void;
  resetDrop: () => void;
  // ... other properties (keep same)
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dropPhase, setDropPhase] = useState<DropPhase>('PRE_DROP');
  // ...
}

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
```

3. **Refactor function names** (Lines 251-330):
```typescript
// BEFORE (Line 251):
const startGame = () => {
  setPhase('DROP_LIVE');
};

const attack = async (damage: number) => {
  // ... purchase logic
};

const resetGame = async () => {
  setPhase('PRE_DROP');
  // ... reset logic
};

// AFTER:
const viewLiveProduct = () => {
  setDropPhase('DROP_LIVE');
};

const purchaseProduct = async (quantity: number) => {
  // Rename 'damage' parameter to 'quantity'
  // Keep the same logic but update variable names
  const now = Date.now();
  
  setPurchaseHistory(prev => [...prev, { timestamp: now }]);
  setLastPurchaseTime(now);
  
  const randomCity = TEXAS_CITIES[Math.floor(Math.random() * TEXAS_CITIES.length)];
  const purchaseEvent: PurchaseEvent = {
    timestamp: now,
    location: randomCity,
    count: quantity, // Changed from: damage / 10
    id: `${now}-${Math.random().toString(36).substr(2, 9)}`
  };
  
  setRecentPurchases(prev => [...prev, purchaseEvent].slice(-10));
  
  const stockRef = doc(db, 'flavors', CURRENT_FLAVOR_ID);
  
  try {
    // Update stock by quantity (assumes 1 quantity = 1 stock unit)
    await updateDoc(stockRef, {
      stock: increment(-quantity)
    });

    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const purchaseAmount = quantity * 20; // $20 per bag
      
      await addDoc(collection(db, `users/${user.uid}/orders`), {
        items: cart.length > 0 ? cart : [{
          id: `${now}`,
          flavorId: CURRENT_FLAVOR_ID,
          name: 'Current Flavor', 
          price: 20,
          quantity: quantity,
          image: '/assets/logo.png'
        }],
        total: purchaseAmount,
        timestamp: now,
        status: 'completed'
      });

      const currentSpent = (userProfile?.totalSpent || 0) + purchaseAmount;
      let newRank = 'ROOKIE';
      if (currentSpent > 500) newRank = 'LEGEND';
      else if (currentSpent > 100) newRank = 'COMMANDER';
      else if (currentSpent > 20) newRank = 'PILOT';

      await updateDoc(userRef, {
        totalSpent: increment(purchaseAmount),
        missionsCompleted: increment(1),
        flavorsCollected: increment(quantity),
        rank: newRank
      });
      
      setCart([]); 
    }
  } catch (error) {
    console.error("Error updating stock/user data:", error);
  }
};

const resetDrop = async () => {
  setDropPhase('PRE_DROP');
  setEmail('');
  setStockVelocity(0);
  setLastPurchaseTime(null);
  setPurchaseHistory([]);
  setRecentPurchases([]);
  
  const stockRef = doc(db, 'flavors', CURRENT_FLAVOR_ID);
  try {
    await setDoc(stockRef, { stock: 100 }, { merge: true });
  } catch (error) {
    console.error("Error resetting stock:", error);
  }
};
```

4. **Update Provider value** (Lines 394-423):
```typescript
// BEFORE:
return (
  <GameContext.Provider value={{
    phase,
    startGame,
    attack,
    resetGame,
    // ...
  }}>
    {children}
  </GameContext.Provider>
);

// AFTER:
return (
  <ShopContext.Provider value={{
    dropPhase,
    viewLiveProduct,
    purchaseProduct,
    resetDrop,
    // ... keep all cart and user properties
  }}>
    {children}
  </ShopContext.Provider>
);
```

5. **Update Firestore listener** (Line 187):
```typescript
// BEFORE:
if (newStock <= 0 && phase !== 'POST_DROP') {
  setPhase('POST_DROP');
}

// AFTER:
if (newStock <= 0 && dropPhase !== 'POST_DROP') {
  setDropPhase('POST_DROP');
}
```

---

### Priority 2: UI Components - Battle Screen

#### **File**: `src/components/BattleScreen.tsx`
**New Name**: `src/components/LiveProductScreen.tsx`

**Changes Required**:

1. **Rename the file** from `BattleScreen.tsx` to `LiveProductScreen.tsx`

2. **Update imports** (Line 4):
```typescript
// BEFORE:
import { useGame } from '../context/GameContext';

// AFTER:
import { useShop } from '../context/ShopContext';
```

3. **Update component declaration and hook usage** (Line 10-16):
```typescript
// BEFORE:
const BattleScreen = () => {
  const { stock, stockVelocity, attack, phase, recentPurchases, user, addToCart } = useGame();
  // ...
}

// AFTER:
const LiveProductScreen = () => {
  const { stock, stockVelocity, purchaseProduct, dropPhase, recentPurchases, user, addToCart } = useShop();
  // ...
}
```

4. **Rename functions and variables**:
```typescript
// BEFORE (Line 18):
const handleAttackClick = () => {
  sfx.playClick();
  setShowMenu(true);
  setCheckoutStep('SELECT');
};

// AFTER:
const handleBuyNowClick = () => {
  sfx.playClick();
  setShowMenu(true);
  setCheckoutStep('SELECT');
};
```

5. **Update checkout handler** (Line 24-57):
```typescript
// BEFORE:
attack(10); // Simulate selling 1 bag (10 damage)

// AFTER:
purchaseProduct(1); // Purchase 1 bag
```

6. **Update UI text** - Replace ALL battle/combat terminology:
   - Line 96: Comment "HUD" → "Product Header"
   - Line 106-111: "Boss HP Bar" → "Stock Level Bar"
   - Line 161: "Battle Arena (Center)" → "Product Display (Center)"
   - Line 163-179: "Boss Sprite" → "Product Image"
   - Line 181-186: "Boss Stats" → "Product Stats"
   - Line 196-206: "BUY NOW ($20)" button text (already good)
   - Line 194: "Control Panel (Bottom)" → "Purchase Controls (Bottom)"

7. **Update specific text replacements**:
```typescript
// Line 109 (HP Bar label):
// BEFORE:
<span>{flavor.name.toUpperCase()}</span>

// AFTER:
<span>{flavor.name.toUpperCase()} - LIVE DROP</span>

// Line 202 (Button text - keep as is, already says "BUY NOW"):
<span>BUY NOW ($20)</span>
```

8. **Update export** (Line 264):
```typescript
// BEFORE:
export default BattleScreen;

// AFTER:
export default LiveProductScreen;
```

---

### Priority 2: UI Components - Game Over Screen

#### **File**: `src/components/GameOverScreen.tsx`
**New Name**: `src/components/SoldOutScreen.tsx`

**Changes Required**:

1. **Complete rewrite** - Replace entire file content:
```typescript
"use client";

import React from 'react';
import { useShop } from '../context/ShopContext';

const SoldOutScreen = () => {
  const { resetDrop, timeLeft } = useShop();

  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center animate-fade-in">
      <h1 className="text-6xl md:text-8xl font-pixel text-red-600 drop-shadow-[4px_4px_0_rgba(255,255,255,0.2)]">
        SOLD OUT
      </h1>
      <p className="font-mono text-2xl text-red-400 animate-pulse">
        THIS DROP IS COMPLETE
      </p>

      <div className="bg-black border-4 border-gray-600 p-8 rounded-lg mt-8 max-w-lg">
        <p className="font-pixel text-yellow-400 text-xl mb-4">
          NEXT FLAVOR DROPS IN:
        </p>
        <div className="font-mono text-3xl text-white mb-6">
          {String(timeLeft.days).padStart(2, '0')}d : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m
        </div>
        
        <p className="text-gray-400 font-mono text-sm mb-4">
          Join our waitlist to get notified when the next limited edition drops
        </p>
        
        <input 
          type="email" 
          placeholder="ENTER EMAIL ADDRESS"
          className="bg-gray-900 border-2 border-yellow-400 text-white font-mono text-lg p-3 w-full mb-4 focus:outline-none focus:border-white"
        />
        <button 
          className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-pixel py-3 rounded transition-colors"
          onClick={() => alert("Subscribed for next drop!")}
        >
          NOTIFY ME
        </button>
      </div>

      <button 
        onClick={resetDrop}
        className="text-gray-500 font-mono hover:text-white mt-12 underline text-sm"
      >
        [ ADMIN: RESET DROP ]
      </button>
    </div>
  );
};

export default SoldOutScreen;
```

---

### Priority 3: Product Pages

#### **File**: `src/app/shop/[flavorId]/page.tsx`

**Changes Required**:

1. **Update imports** (Line 2):
```typescript
// BEFORE:
import { GameProvider } from '../../../context/GameContext';

// AFTER:
import { ShopProvider } from '../../../context/ShopContext';
```

2. **Update provider** (Line 17-21):
```typescript
// BEFORE:
return (
  <GameProvider>
    <Background />
    <Navigation />
    <ProductDetailClient flavorId={params.flavorId} />
  </GameProvider>
);

// AFTER:
return (
  <ShopProvider>
    <Background />
    <Navigation />
    <ProductDetailClient flavorId={params.flavorId} />
  </ShopProvider>
);
```

---

#### **File**: `src/app/shop/[flavorId]/ProductDetailClient.tsx`

**Changes Required**:

1. **Update imports** (Line 4):
```typescript
// BEFORE:
import { useGame } from '../../../context/GameContext';

// AFTER:
import { useShop } from '../../../context/ShopContext';
```

2. **Update hook usage** (Line 15):
```typescript
// BEFORE:
const { user, startGame, addToCart } = useGame();

// AFTER:
const { user, viewLiveProduct, addToCart } = useShop();
```

3. **Update function** (Line 59-64):
```typescript
// BEFORE:
const handleStartBattle = () => {
  if (isLive) {
    startGame();
    router.push('/shop');
  }
};

// AFTER:
const handleViewLive = () => {
  if (isLive) {
    viewLiveProduct();
    router.push('/shop');
  }
};
```

4. **Update button** (Line 189-196):
```typescript
// BEFORE:
<button
  onClick={handleStartBattle}
  className="w-full bg-red-600 hover:bg-red-500 text-white font-pixel py-4 px-8 border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all text-xl"
>
  START BATTLE MODE
</button>

// AFTER:
<button
  onClick={handleViewLive}
  className="w-full bg-red-600 hover:bg-red-500 text-white font-pixel py-4 px-8 border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all text-xl"
>
  VIEW LIVE DROP
</button>
```

---

#### **File**: `src/app/shop/page.tsx`

**Changes Required**:

1. **Update imports** (Lines 4, 11):
```typescript
// BEFORE:
import { useGame } from '../../context/GameContext';
import BattleScreen from '../../components/BattleScreen';

// AFTER:
import { useShop } from '../../context/ShopContext';
import LiveProductScreen from '../../components/LiveProductScreen';
```

2. **Update hook usage** (Line 99):
```typescript
// BEFORE:
const { user, phase, startGame, authLoading } = useGame();

// AFTER:
const { user, dropPhase, viewLiveProduct, authLoading } = useShop();
```

3. **Update phase check** (Line 151):
```typescript
// BEFORE:
if (phase === 'DROP_LIVE') {
  return <BattleScreen />;
}

// AFTER:
if (dropPhase === 'DROP_LIVE') {
  return <LiveProductScreen />;
}
```

4. **Update UI text** (Line 164-166):
```typescript
// BEFORE:
<h1 className="text-4xl md:text-6xl font-pixel text-yellow-400 mb-4">
  MISSION CONTROL
</h1>

// AFTER:
<h1 className="text-4xl md:text-6xl font-pixel text-yellow-400 mb-4">
  FLAVOR DROPS
</h1>
```

5. **Update banner title** (Line 177-179):
```typescript
// BEFORE:
<div className={`font-pixel text-2xl ${currentFlavor.colors.primary} mb-2 animate-pulse`}>
  CURRENT MISSION: {currentFlavor.name.toUpperCase()}
</div>

// AFTER:
<div className={`font-pixel text-2xl ${currentFlavor.colors.primary} mb-2 animate-pulse`}>
  LIVE NOW: {currentFlavor.name.toUpperCase()}
</div>
```

6. **Update button** (Line 182-187):
```typescript
// BEFORE:
<button
  onClick={startGame}
  className="bg-red-600 hover:bg-red-500 text-white font-pixel py-3 px-8 border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all"
>
  START BATTLE
</button>

// AFTER:
<button
  onClick={viewLiveProduct}
  className="bg-red-600 hover:bg-red-500 text-white font-pixel py-3 px-8 border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all"
>
  SHOP NOW
</button>
```

---

### Priority 4: Other Pages

#### **File**: `src/components/TitleScreen.tsx`

**Changes Required**:

1. **Update imports** (Line 4):
```typescript
// BEFORE:
import { useGame } from '../context/GameContext';

// AFTER:
import { useShop } from '../context/ShopContext';
```

2. **Update hook usage** (Line 14):
```typescript
// BEFORE:
const { timeLeft, startGame, user, login, authLoading, email, setEmail } = useGame();

// AFTER:
const { timeLeft, viewLiveProduct, user, login, authLoading, email, setEmail } = useShop();
```

3. **Update function** (Line 42-45):
```typescript
// BEFORE:
const handleStartMission = () => {
  sfx.playClick();
  startGame();
};

// AFTER:
const handleShopNow = () => {
  sfx.playClick();
  viewLiveProduct();
};
```

4. **Update button** (Line 204-212):
```typescript
// BEFORE:
<button 
  onClick={handleStartMission}
  onMouseEnter={() => sfx.playHover()}
  className="mt-8 bg-red-600 hover:bg-red-500 text-white border-b-4 border-red-800 active:border-b-0 active:translate-y-1 font-pixel py-4 px-8 rounded text-xl shadow-[0_0_20px_rgba(255,0,0,0.5)]"
>
  START MISSION NOW
  <br/>
  <span className="text-xs opacity-75">(DEMO MODE)</span>
</button>

// AFTER:
<button 
  onClick={handleShopNow}
  onMouseEnter={() => sfx.playHover()}
  className="mt-8 bg-red-600 hover:bg-red-500 text-white border-b-4 border-red-800 active:border-b-0 active:translate-y-1 font-pixel py-4 px-8 rounded text-xl shadow-[0_0_20px_rgba(255,0,0,0.5)]"
>
  SHOP LIVE DROP
</button>
```

---

#### **File**: `src/app/layout.tsx`

**Check if GameProvider is used in the root layout. If so:**

```typescript
// BEFORE:
import { GameProvider } from '../context/GameContext';

// AFTER:
import { ShopProvider } from '../context/ShopContext';

// And update the provider wrapper
```

---

#### **File**: `src/app/page.tsx`

**Check main page for GameProvider usage and update similarly.**

---

### Priority 5: Smaller Components

#### **File**: `src/components/IntroScreen.tsx`
**Status**: ✅ Already updated with ice cream messaging (no changes needed)

---

#### **File**: `src/components/Navigation.tsx`
**Action**: Review for any game-related terminology
- Check for "missions", "battles", "combat" references
- Update to "shop", "products", "drops"

---

#### **File**: `src/components/PurchaseTicker.tsx`
**Status**: Likely okay, but verify terminology is e-commerce focused

---

#### **File**: `src/components/FlavorArchive.tsx`
**Status**: Likely okay, verify no game references

---

## Component Refactoring Priority

### Phase 1: Critical Path (Do These First)
1. ✅ `GameContext.tsx` → `ShopContext.tsx` 
2. ✅ `BattleScreen.tsx` → `LiveProductScreen.tsx`
3. ✅ `GameOverScreen.tsx` → `SoldOutScreen.tsx`
4. ✅ Update all imports in consuming components

### Phase 2: User-Facing Pages
5. ✅ `ProductDetailClient.tsx` - Remove battle button
6. ✅ `shop/page.tsx` - Update titles and buttons
7. ✅ `TitleScreen.tsx` - Update landing page copy

### Phase 3: Polish
8. ✅ Navigation component - Update menu items
9. ✅ Review all remaining components for terminology
10. ✅ Update TypeScript types across codebase

---

## State Management Changes

### Context Refactoring Summary

**What Changes:**
- File name: `GameContext.tsx` → `ShopContext.tsx`
- Context: `GameContext` → `ShopContext`
- Provider: `GameProvider` → `ShopProvider`
- Hook: `useGame()` → `useShop()`
- Types: `GamePhase` → `DropPhase`, `GameContextType` → `ShopContextType`

**What Stays:**
- All cart functionality (already e-commerce focused)
- User authentication logic
- Firebase integration
- Real-time inventory sync
- Purchase history tracking

**Function Mapping:**
```typescript
// OLD               → NEW
startGame()         → viewLiveProduct()
attack(damage)      → purchaseProduct(quantity)
resetGame()         → resetDrop()
phase               → dropPhase
```

### Updating "attack" to "purchaseProduct"

**Key Changes in Logic:**
1. Parameter: `damage: number` → `quantity: number`
2. Calculation: Remove `damage / 10` conversions
3. Direct mapping: 1 quantity = 1 bag = $20
4. Stock decrement: `increment(-damage)` → `increment(-quantity)`

**Example transformation:**
```typescript
// BEFORE:
const attack = async (damage: number) => {
  // damage represents stock units (10 damage = 1 bag)
  const bagCount = damage / 10;
  const purchaseAmount = bagCount * 20;
  
  await updateDoc(stockRef, {
    stock: increment(-damage) // Reduce by damage amount
  });
}

// AFTER:
const purchaseProduct = async (quantity: number) => {
  // quantity represents bags directly (1 quantity = 1 bag)
  const purchaseAmount = quantity * 20;
  
  await updateDoc(stockRef, {
    stock: increment(-quantity) // Reduce by quantity
  });
}
```

---

## Asset Replacement Guide

> **Reference**: See [GDD.md Section 5](./GDD.md#5-visual-design-system--asset-specifications) for complete asset specifications

### Critical Asset Replacements

#### Product Images (Highest Priority)
**Current**: Boss monster sprites  
**Replace With**: Professional product photography (pixel art style)

1. `boss-neapolitan.png` → `product-neapolitan-hero.png`
   - Show actual freeze-dried ice cream packaging
   - Tri-color (pink/white/brown) visible
   - 512x512px, pixel art rendered

2. `boss-green-tea.png` → `product-greentea-hero.png`
   - Matcha green color prominent
   - Mochi chunks visible
   - 512x512px

3. `boss-dark-matter.png` → `product-darkchocolate-hero.png`
   - Dark, rich chocolate
   - Premium presentation
   - 512x512px

**Implementation Steps:**
1. Create new product images per GDD specifications
2. Save in `/public/assets/` directory
3. Update `src/lib/flavors.ts` `image` paths
4. Test on all product pages

#### Character/Mascot
**Current**: `astronaut.png` (space character)  
**Replace With**: Ice cream mascot or founder portrait

**Options:**
- Anthropomorphic ice cream cone character
- Company founder in chef attire
- 128x128px pixel art

**Used in:**
- User profile placeholder
- About page
- Chat/support features

#### UI Icons
**Current game icons** → **E-commerce icons**:
- `skull-icon.png` → Remove or replace with "sold out" icon
- `coin-icon.png` → `point-icon.png` (loyalty points)
- Keep: cart, checkmark, close, heart, menu, warning (universal)

**New icons needed:**
- `stock-icon.png` - Inventory indicator
- `timer-icon.png` - Countdown clocks
- `shipping-icon.png` - Delivery status
- `badge-icon.png` - Achievement template

#### Background Assets
**Current**: `nebula.png` (space background)

**Replacement Options** (per GDD):
1. **Marble texture** - Premium feel
2. **Wood grain** - Artisanal aesthetic
3. **Checkered pattern** - Retro diner vibe
4. **Hybrid**: Subtle starfield with ice cream particles

**Recommended**: Option 4 (maintains brand while pivoting theme)

---

## Testing Checklist

### Functional Testing

#### State Management
- [ ] `useShop()` hook works in all components
- [ ] `dropPhase` transitions correctly (PRE_DROP → LIVE → POST_DROP)
- [ ] `viewLiveProduct()` navigates to correct screen
- [ ] `purchaseProduct()` decrements inventory correctly
- [ ] `resetDrop()` restores initial state (admin only)

#### Purchase Flow
- [ ] Add to cart from product detail page works
- [ ] Cart displays items correctly
- [ ] Quantity changes update totals
- [ ] Checkout completes purchase
- [ ] Inventory updates in real-time
- [ ] Purchase appears in user order history
- [ ] Loyalty points are awarded

#### Live Drop Screen
- [ ] Stock bar updates in real-time
- [ ] Purchase ticker shows recent activity
- [ ] Buy button opens payment menu
- [ ] Payment methods display correctly
- [ ] Purchase confirmation shows
- [ ] Stock depletes correctly

#### Sold Out State
- [ ] Triggers when inventory reaches 0
- [ ] Displays "SOLD OUT" messaging
- [ ] Shows countdown to next drop
- [ ] Email signup works
- [ ] Admin reset function works

### UI/UX Testing

#### Terminology Audit
- [ ] No "battle", "attack", "boss", "mission" references in UI
- [ ] All buttons use e-commerce language ("Shop Now", "Buy Now", "Add to Cart")
- [ ] Headers say "Shop" not "Mission Control"
- [ ] Product pages use shopping terminology

#### Visual Consistency
- [ ] All pages maintain pixel art aesthetic
- [ ] Color schemes match flavor themes
- [ ] Fonts consistent (Press Start 2P, VT323)
- [ ] Spacing follows 8px grid system

#### Mobile Responsiveness
- [ ] All refactored pages work on mobile
- [ ] Product images scale correctly
- [ ] Buttons are thumb-friendly
- [ ] Navigation menu functions

### Integration Testing

#### Firebase
- [ ] Real-time inventory sync works across sessions
- [ ] User authentication persists
- [ ] Orders save to Firestore
- [ ] Profile updates correctly

#### Performance
- [ ] Page load times acceptable
- [ ] Image assets optimized
- [ ] No memory leaks from context changes
- [ ] Real-time listeners clean up properly

---

## Migration Checklist

### Pre-Development
- [ ] Review this guide completely
- [ ] Read updated [GDD.md](./GDD.md) for design specs
- [ ] Back up current codebase
- [ ] Create feature branch: `git checkout -b refactor/game-to-ecommerce`

### Development Phase 1: Core (Days 1-2)
- [ ] Rename `GameContext.tsx` to `ShopContext.tsx`
- [ ] Update all type definitions and function names
- [ ] Update all component imports
- [ ] Test context changes in isolation

### Development Phase 2: Components (Days 3-4)
- [ ] Refactor `BattleScreen.tsx` → `LiveProductScreen.tsx`
- [ ] Rewrite `GameOverScreen.tsx` → `SoldOutScreen.tsx`
- [ ] Update product detail pages
- [ ] Update shop listing page
- [ ] Update title/landing page

### Development Phase 3: Polish (Days 5-6)
- [ ] Update Navigation component
- [ ] Review all remaining components
- [ ] Update TypeScript types consistently
- [ ] Update all UI copy to e-commerce language

### Asset Creation (Parallel Track)
- [ ] Commission/create product images per GDD specs
- [ ] Create ice cream mascot character
- [ ] Design new UI icons
- [ ] Prepare background textures

### Asset Integration (Day 7)
- [ ] Replace all product images
- [ ] Update character sprites
- [ ] Replace icon files
- [ ] Update background assets
- [ ] Optimize all images

### Testing (Day 8)
- [ ] Run functional tests
- [ ] Complete UI audit
- [ ] Test on multiple devices
- [ ] Performance testing
- [ ] User acceptance testing

### Deployment
- [ ] Merge feature branch
- [ ] Deploy to staging
- [ ] Final QA pass
- [ ] Deploy to production
- [ ] Monitor for issues

---

## Common Pitfalls to Avoid

### 1. Inconsistent Naming
❌ **Don't**: Mix old and new names  
✅ **Do**: Complete rename in one commit per file

### 2. Breaking Real-Time Features
❌ **Don't**: Change Firestore listener logic unnecessarily  
✅ **Do**: Keep inventory sync logic intact, only rename variables

### 3. Cart Functionality
❌ **Don't**: Modify working cart features  
✅ **Do**: Only update context names, keep cart logic same

### 4. Type Safety
❌ **Don't**: Use `any` types during refactor  
✅ **Do**: Update TypeScript definitions properly

### 5. Git History
❌ **Don't**: Make massive commits with everything  
✅ **Do**: Commit each major component refactor separately

---

## Quick Reference Command List

```bash
# Create feature branch
git checkout -b refactor/game-to-ecommerce

# Rename files (Git-aware)
git mv src/context/GameContext.tsx src/context/ShopContext.tsx
git mv src/components/BattleScreen.tsx src/components/LiveProductScreen.tsx
git mv src/components/GameOverScreen.tsx src/components/SoldOutScreen.tsx

# Find all instances of old names
grep -r "useGame" src/
grep -r "GameContext" src/
grep -r "BattleScreen" src/
grep -r "attack(" src/

# Test the app
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check  # if available

# Commit incrementally
git add src/context/ShopContext.tsx
git commit -m "refactor: rename GameContext to ShopContext"

git add src/components/LiveProductScreen.tsx
git commit -m "refactor: rename BattleScreen to LiveProductScreen"
```

---

## Support & Questions

### Documentation References
- **Design Specs**: [GDD.md](./GDD.md)
- **Roadmap**: [ROADMAP.md](./ROADMAP.md)
- **React Context API**: [React Docs](https://react.dev/reference/react/useContext)
- **Next.js App Router**: [Next.js Docs](https://nextjs.org/docs/app)

### Key Decisions Made
1. **Keep pixel art aesthetic** - Brand differentiator
2. **Transform don't remove** - Features become e-commerce focused
3. **Maintain real-time sync** - Critical for limited drops
4. **Preserve cart logic** - Already e-commerce ready
5. **Subtle gamification** - Loyalty points and badges stay

---

## Final Notes

This transformation is about **reframing, not rebuilding**. The underlying architecture is already e-commerce ready - we're removing the game metaphor layer to reveal the shopping experience underneath.

**Remember:**
- Every "boss battle" is a product showcase
- Every "attack" is a purchase
- Every "HP bar" is a stock indicator
- Every "mission" is a limited drop

The pixel art aesthetic and limited-edition drop mechanics are **assets**, not liabilities. They make Space City Scoops unique in the freeze-dried ice cream market. This refactor clarifies that we sell ice cream, not sell games.

Good luck, and happy refactoring! 🍦

---

**Document Version**: 1.0  
**Last Updated**: 2025-12-06  
**Author**: Development Team  
**Status**: Ready for Implementation