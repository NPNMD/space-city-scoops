# Asset Integration Guide

## Asset List

### Icons
- **Cart**: `cart-icon.png`
- **Coin**: `coin-icon.png`
- **Warning**: `warning-icon.png`
- **Checkmark**: `checkmark-icon.png` (Success states)
- **Skull**: `skull-icon.png` (Game Over)
- **Menu**: `menu-icon.png` (Mobile nav)
- **Close**: `close-icon.png` (Modals)
- **Heart**: `heart-icon.png` (Lives/HP)

### Characters
- **Coin Character**: Animated UI element
- **Cart Character**: Animated UI element

## Integration Examples

### 1. Navigation (Cart & Menu)
```tsx
import Image from 'next/image';

// Mobile Menu Button
<button>
  <Image src="/assets/menu-icon.png" alt="Menu" width={24} height={24} className="pixel-art" />
</button>

// Cart Link
<Link href="/cart" className="flex items-center gap-2">
  <Image src="/assets/cart-icon.png" alt="Cart" width={24} height={24} className="pixel-art" />
  <span>CART ({count})</span>
</Link>
```

### 2. Battle Screen (Heart & Warning)
```tsx
// HP Bar Label
<div className="flex items-center gap-2">
  <Image src="/assets/heart-icon.png" alt="HP" width={20} height={20} className="pixel-art" />
  <span>HP: {stock}/100</span>
</div>

// Critical Warning
<div className="flex items-center gap-2 text-red-500">
  <Image src="/assets/warning-icon.png" alt="Warning" width={24} height={24} className="pixel-art" />
  <span>CRITICAL STOCK!</span>
</div>
```

### 3. Game Over (Skull)
```tsx
<div className="flex flex-col items-center">
  <Image src="/assets/skull-icon.png" alt="Game Over" width={64} height={64} className="pixel-art mb-4" />
  <h1>GAME OVER</h1>
</div>
```

### 4. Success Message (Checkmark)
```tsx
<div className="flex items-center gap-2 text-green-400">
  <Image src="/assets/checkmark-icon.png" alt="Success" width={24} height={24} className="pixel-art" />
  <span>ADDED TO CART!</span>
</div>
```

### 5. Modals (Close)
```tsx
<button className="absolute top-2 right-2">
  <Image src="/assets/close-icon.png" alt="Close" width={20} height={20} className="pixel-art" />
</button>
```
