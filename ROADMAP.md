# Roadmap - Space City Scoops

## Phase 1: Foundation & Assets
- [x] Initialize Next.js Project with Tailwind CSS.
- [x] Configure global "Pixel Art" styles (Fonts, CRT effect class).
- [x] Generate Core Assets via PixelLab:
  - [x] Logo ("Space City Scoops")
  - [ ] Background (Starfield) - *Using CSS fallback for now*
  - [x] Astronaut Character (Idle, Thumbs up) - *Generated, waiting for download*
  - [ ] UI Frame/Button Tiles - *Using CSS borders*
  - [x] Boss/Flavor Placeholder Sprite

## Phase 2: Core Components
- [x] Implement `Layout` with CRT overlay.
- [x] Build `TitleScreen` (Phase 1) with Countdown Timer.
- [x] Build `BattleInterface` (Phase 2) with HP Bar logic.
- [x] Build `GameOverScreen` (Phase 3).
- [ ] Build `HighScore` (Archive) page.

## Phase 3: Interactivity & Polish
- [ ] Add Sound Effects (use Web Audio API or simple HTML5 Audio).
- [ ] Implement Email Capture logic (Mock/API).
- [ ] Connect "Attack" button to Checkout flow (Mock).
- [ ] Add animations (CSS Keyframes for sprites).

## Phase 4: Launch Prep
- [ ] Mobile Responsiveness check.
- [ ] Performance optimization (Asset loading).


## FOMO Features Implementation

This section outlines a phased approach to implementing psychological triggers and scarcity mechanics that drive urgency and engagement.

### Phase 1: High-Impact, Low-Effort (Week 1-2)

**1. Live Stock Depletion Visualization**
- Real-time stock counter with velocity indicators
- Visual urgency cues (color changes, animations)
- "Only X left!" messaging
- **Components:** [`TitleScreen.tsx`](src/components/TitleScreen.tsx), [`BattleScreen.tsx`](src/components/BattleScreen.tsx)
- **State:** Expand [`GameContext.tsx`](src/context/GameContext.tsx) with stock tracking

**2. Social Proof Purchase Ticker**
- Live feed showing anonymous purchases (e.g., "Someone in Houston just ordered!")
- Real-time activity stream
- Geographic diversity indicators
- **Components:** New `PurchaseTicker` component
- **State:** WebSocket or polling mechanism for live updates

**3. Multi-Stage Countdown System**
- Progressive countdown phases with escalating urgency
- Different messaging at each stage (24h → 1h → 15min → SOLD OUT)
- Visual intensity increases as deadline approaches
- **Components:** Enhanced countdown in [`TitleScreen.tsx`](src/components/TitleScreen.tsx)
- **State:** Countdown phase tracking in [`GameContext.tsx`](src/context/GameContext.tsx)

**4. Regret/Miss Messaging**
- Post-sellout messaging emphasizing what was lost
- "You missed out on [FLAVOR]" displays
- Next drop teaser to maintain engagement
- **Components:** [`GameOverScreen.tsx`](src/components/GameOverScreen.tsx)
- **State:** Track missed opportunities in user session

### Phase 2: Medium Complexity (Week 3-4)

**5. Rarity Tier System**
- Randomized drop rarity: COMMON / RARE / EPIC / LEGENDARY
- Different visual treatments per tier
- Rarity announcement on drop reveal
- **Components:** [`BattleScreen.tsx`](src/components/BattleScreen.tsx)
- **State:** Rarity calculation logic in [`GameContext.tsx`](src/context/GameContext.tsx)

**6. Leaderboard System**
- Competition tracking and rankings
- "Top Scoopers" display
- Achievement badges and milestones
- **Components:** New `Leaderboard` component, [`GameOverScreen.tsx`](src/components/GameOverScreen.tsx)
- **State:** New leaderboard context or API integration

**7. Flash Sale Windows**
- Surprise bonus periods during drops
- Extra stock or special pricing for limited time
- "FLASH SALE ACTIVE" visual alerts
- **Components:** Overlay component for flash notifications
- **State:** Flash sale timer and status in [`GameContext.tsx`](src/context/GameContext.tsx)

**8. Combo/Streak Bonuses**
- Rewards for consecutive or rapid purchases
- "You're on fire!" messaging
- Unlockable perks (early access, discounts)
- **Components:** Streak counter UI element
- **State:** User streak tracking in [`GameContext.tsx`](src/context/GameContext.tsx)

### Phase 3: Advanced Systems (Month 2+)

**9. Queue/Pre-Order System**
- Reserve spots before drop goes live
- Queue position display and management
- "You're #47 in line" messaging
- **Components:** New `QueueScreen` component
- **State:** Queue management system (backend integration required)

**10. Location-Based Drops**
- Geo-restricted availability
- "Houston-Exclusive Drop!" messaging
- Regional competition dynamics
- **Components:** Location detection and display
- **State:** Geolocation API integration

**11. Random Restock Events**
- Unexpected small inventory additions
- "SURPRISE RESTOCK!" notifications
- Creates checking behavior and re-engagement
- **Components:** Notification system
- **State:** Random event scheduler in backend

**12. Probability Calculator**
- Live odds display based on stock velocity
- "23% chance remaining" visual indicator
- Mathematical urgency reinforcement
- **Components:** Odds display widget
- **State:** Real-time calculation based on stock depletion rate

### Technical Implementation Notes

#### State Management Expansion ([`GameContext.tsx`](src/context/GameContext.tsx))
- Add stock tracking and velocity calculation
- Implement rarity tier logic
- Add countdown phase management
- Integrate streak/combo tracking
- Add flash sale state management
- Implement queue position tracking

#### Component Enhancements Required

**[`TitleScreen.tsx`](src/components/TitleScreen.tsx)**
- Multi-stage countdown display
- Stock counter integration
- Flash sale notifications
- Queue position indicator

**[`BattleScreen.tsx`](src/components/BattleScreen.tsx)**
- Rarity tier visual treatment
- Live stock depletion display
- Purchase ticker integration
- Probability calculator widget

**[`GameOverScreen.tsx`](src/components/GameOverScreen.tsx)**
- Regret messaging system
- Leaderboard display
- Streak achievement showcase
- Next drop teaser

#### Additional Components Needed
- `PurchaseTicker`: Live social proof feed
- `Leaderboard`: Competition rankings
- `FlashSaleNotification`: Urgency overlays
- `StreakCounter`: Achievement tracking
- `QueueScreen`: Pre-drop queue management
- `OddsCalculator`: Probability display widget

### Success Metrics
- Conversion rate improvement
- Time-to-purchase reduction
- Return visitor rate
- Email capture rate
- Social sharing engagement
- Average cart value increase
