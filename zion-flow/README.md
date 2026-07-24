# Zion Flow — Restaurant Reservation Operating System

**Version 1.0 — Foundation & Dashboard**

## Mission

Centralize every reservation in one elegant place — from website, phone, WhatsApp, email, or walk-in. A mobile-first, minimalist restaurant operating system focused on one problem: reservation management.

## Current Status ✅

### Completed: Dashboard Screen

The first screen shows:
- **Service Book Overview** — Date, day service, key metrics
- **KPI Cards** — Covers (23), Pacing (12/hr), VIPs (3)
- **Smart Filters** — All, Confirmed, Seated, VIP
- **Reservation List** — Time-ordered, with guest details and status
- **Floating Action Button** — Quick add reservation
- **Bottom Navigation** — TODAY, GUESTS, FLOOR, MSG, ADMIN

## Design Language

**Premium Minimalism:**
- Color: Beige/Cream (#f5f3f0) + Dark Brown (#3a3530)
- Typography: Playfair Display (serif headers) + Inter (body)
- Spacing: Generous white space, 4px base unit
- Mobile-first: iPhone optimized before desktop
- No sidebars, linear navigation

## Features

### Dashboard (✅ Complete)
- View all reservations at a glance
- Filter by status
- See critical metrics
- Quick reservation addition
- Fully responsive (mobile → tablet → desktop)

### Coming Next

#### 2. Guests Screen
- Ledger of repeat/VIP guests
- Visit count and spend tracking
- Guest preferences and notes
- Search functionality

#### 3. Floor View
- Visual seating chart
- Table assignment
- Real-time occupancy
- Walk-in capacity management

#### 4. Messages
- Centralized notifications
- Reservation confirmations
- Guest requests
- Channel history (website, phone, WhatsApp, email)

#### 5. Admin Settings
- Restaurant profile
- Service hours
- Turn time configuration
- Staff management
- Waitlist policy
- Notification settings

## Technical Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, responsive grid/flexbox
- **Vanilla JavaScript** — Lightweight, no dependencies
- **No database yet** — Mock data for MVP

## File Structure

```
zion-flow/
├── index.html         # Main Dashboard
├── styles.css         # Design system & components
├── app.js             # State & interactions
└── README.md          # This file
```

## Running Locally

```bash
# Start Python HTTP server
python3 -m http.server 7070 --directory /path/to/zion-flow

# Open browser
http://localhost:7070
```

Or use Claude Code's dev server configuration:
- Config: `.claude/launch.json` (zion-flow)
- Run: `preview_start { name: "zion-flow" }`

## Design Principles

1. **Simplicity** — Every element has a purpose
2. **Elegance** — Editorial typography & white space
3. **Mobile-First** — iPhone-native feel
4. **Accessibility** — Clear hierarchy, touch-friendly
5. **Functional** — No unnecessary complexity
6. **Centralization** — One source of truth for reservations

## Roadmap

**Phase 1 (Current):** Dashboard foundation
**Phase 2:** Multi-screen navigation + data persistence
**Phase 3:** Channel integrations (WhatsApp, email APIs)
**Phase 4:** Analytics & reporting (future)

---

Built with ❤️ for restaurant operators.
