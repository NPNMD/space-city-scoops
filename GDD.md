# Game Design Document (GDD) - Space City Scoops: The 32-Bit Edition

## 1. Overview
**Concept:** "Super Space Sity"
**Vibe:** Late-era SNES games (Super Metroid, Chrono Trigger). Detailed sprites, vibrant colors, chunky UI, chiptune audio.
**Core Loop:** 
1. **Pre-Drop:** Hype machine, countdown, email capture.
2. **Drop (Battle):** Boss battle against the "Flavor Boss" (Stock = HP).
3. **Post-Drop:** Game Over / Continue screen.

## 2. Visual & Audio Aesthetic
- **Visuals:** 
  - 32-bit Pixel Art.
  - Fonts: `Press Start 2P` (Titles) & `VT323` (Body).
  - UI: Pixelated, beveled metallic frames with bolts.
  - CRT Filter: Overlay with scanlines and curvature.
- **Audio:**
  - Music: Looping, upbeat 16-bit space theme.
  - SFX: "Bloop" (Hover), "Power-Up" (Buy), "Game Over" (Sold Out).

## 3. User Journey / Phases

### Phase 1: Pre-Drop (The "Title Screen")
- **Background:** Vertically scrolling pixelated starfield.
- **Center:** Pulsing "Space Sity Scoops" pixel logo.
- **Prompt:** "NEXT MISSION STARTS IN: [TIMER]" -> "INSERT COIN (EMAIL) TO READY PLAYER ONE".
- **Interaction:** Email submission triggers Astronaut sprite thumbs up ("OK!").

### Phase 2: The Drop Is Live (The "Boss Battle")
- **HUD:** 
  - Top Left: Player Avatar ("PLAYER 1").
  - Top Right: Boss Health Bar (Stock Counter). Green -> Red -> Explosion.
- **Main:** 
  - Enemy Sprite: Massive animated flavor bag.
  - Stats: CRUNCH LVL, SWEETNESS, RARITY.
- **CTA:** "PRESS START TO ATTACK ($20)" (Arcade Button).
- **Checkout:** Modal Battle Menu (Apple Pay, Google Pay, Card, Run Away).

### Phase 3: Post-Drop (The "Game Over Screen")
- **Trigger:** Stock = 0.
- **Visuals:** Red flash, "GAME OVER", "MISSION FAILED: STOCK DEPLETED".
- **Retention:** "CONTINUE? 9... 8... 7..." (Email capture).

### Archive: High Score Screen
- Leaderboard of past flavors.
- Status: "CLEARED" or "100% COMPLETE".

## 4. Technical Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Custom Pixel CSS
- **Assets:** PixelLab Generated Sprites (Logo, Astronaut, Boss)
- **State Management:** React Context (GameContext)
