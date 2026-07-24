# Zion Flow — Screen-by-Screen Roadmap

## ✅ Screen 1: Dashboard (COMPLETE)

**Purpose:** Central overview of all reservations for the day

**Features:**
- Service book title + date
- KPI metrics (Covers, Pacing, VIPs)
- Status filters (All, Confirmed, Seated, VIP)
- Time-ordered reservation list
- Quick actions (FAB for add)
- Bottom navigation

**Visual Elements:**
- Page title in serif (40px, dark brown)
- KPI cards in 3-column grid (responsive)
- Filter pills (pill-shaped buttons)
- Reservation rows (time | name | details | status)
- FAB button (dark brown circle, + icon)
- Bottom nav with icons + labels

**Status Bar:** Each reservation shows brief status in serif italic

---

## 🎯 Screen 2: Guests (THE LEDGER)

**Purpose:** Centralized guest database with visit history

**Top Section:**
- "THE LEDGER" label
- "Guests" title (serif, 40px)
- Subtitle: "Your community of diners"

**Search & Filter:**
- Search bar (input with icon)
- Filter by: VIP, New, Regular, Waitlist
- Sort by: Name, Visits, Last Visit, Spend

**Guest List:**
- Card for each guest:
  - Name (bold, serif or sans)
  - VIP badge (if applicable)
  - Visit count ("22 visits")
  - Total spend ("€9450")
  - Last visit date (optional)
  - Special notes icon
  
**Guest Card Interactive:**
- Tap to view full profile
- Shows allergies, preferences, history
- Quick reservation option

**Bottom Actions:**
- "Import guests" button
- "+ Add guest" button

---

## 🏠 Screen 3: Floor (SEATING CHART)

**Purpose:** Visual table management and real-time seating

**Header:**
- "DINING ROOM" label
- "The Room" or restaurant name (serif, 40px)
- Room info: "Ground floor · 42 seats · Live view"

**Floor Plan:**
- Interactive diagram with tables/zones
- Table shapes:
  - Circles for 2-person tables (numbered)
  - Rectangles for 4-6 seat booths (labeled)
  - Named zones (Bar, Booth A, etc.)

**Table States:**
- **Assigned** (border highlight)
- **Seated** (filled background)
- **Open** (outline only)
- **Hold** (grayed out)

**Tap Interaction:**
- Shows guest name when seated
- Allows reassignment
- Shows remaining time
- Note taking

**Occupancy Info:**
- "42 seats · 23 assigned · 18 seated · 1 hold"
- Color-coded legend

**Legend:**
- Dots/circles for state indicators
- Status indicators below floor

---

## 💬 Screen 4: Messages (COMMUNICATION HUB)

**Purpose:** Centralized guest communication & reservation notifications

**Header:**
- "COMMUNICATIONS" label (optional)
- "Messages" title (serif, 40px)

**Channels Section:**
- Tabs or toggles for:
  - All (default)
  - Website
  - Phone
  - WhatsApp
  - Email
  - In-Person

**Message Thread List:**
- Each row shows:
  - Guest name
  - Last message preview
  - Time/date
  - Unread indicator
  - Channel icon (🌐 📱 💬 📧 👤)

**Message Types:**
- Reservation confirmation
- Change request
- Special request (allergies, celebration)
- Cancellation
- Inquiry

**Quick Actions:**
- Search messages
- Filter by unread
- Filter by channel

**Message Detail (on tap):**
- Full conversation thread
- Guest name + info
- All communication history
- Quick reply templates
- Call/WhatsApp buttons

---

## ⚙️ Screen 5: Admin (SETTINGS & CONFIG)

**Purpose:** Restaurant setup and system configuration

**Header:**
- "HOUSE SETTINGS" label
- "Admin" title (serif, 40px)

**Sections:**

### 1. Restaurant Profile
- Name
- Address
- Phone
- Email
- Website
- Logo/image

### 2. Service Hours
- Opening time
- Closing time
- Days of operation
- Special hours (lunch/dinner)

### 3. Turn Time
- Default reservation duration
- Configurable per time slot
- Buffer between seatings

### 4. Staff Management
- Staff list (names, roles)
- Availability/schedule
- Hostess assignments

### 5. Waitlist Policy
- Hold time (default: 15 min)
- Max waitlist capacity
- Auto-cancellation rules

### 6. Notifications
- Email confirmations (on/off)
- SMS confirmations (on/off)
- WhatsApp messages (on/off)
- Reminder timing

### 7. Preferences
- Language
- Currency
- Time format (12/24hr)
- Theme (light/dark)

### 8. Data & Backup
- Export reservations
- Export guest list
- Clear historical data

**Interactive Elements:**
- Toggle switches for on/off settings
- Input fields for text
- Time pickers for hours
- Color picker for branding

---

## Navigation Between Screens

**Bottom Navigation (persistent):**
- TODAY → Dashboard
- GUESTS → Guests ledger
- FLOOR → Seating chart
- MSG → Messages
- ADMIN → Settings

**Transitions:**
- Smooth fade or slide
- Preserve scroll position when returning
- Bottom nav stays visible

---

## Design Consistency Across All Screens

### Header Pattern (every screen)
```
[Label - 11px italic serif gray]
[Title - 40px serif dark brown]
[Optional subtitle or controls right-aligned]
```

### Content Area
- Padding: 16px mobile, 20-32px tablet/desktop
- Max-width: 1200px centered
- Generous white space

### Interactions
- Touch targets: minimum 44px
- No harsh animations
- Smooth 200-300ms transitions
- Clear visual feedback

### Typography Hierarchy
- Labels: 11px, serif italic, gray
- Titles: 40px, serif, dark brown
- Subtitles: 14px, sans, medium gray
- Body text: 14px, sans, dark brown
- Metadata: 12px, sans, light gray

### Color Usage
- Background: Beige (#f5f3f0)
- Text primary: Dark brown (#2a2420)
- Text secondary: Medium gray (#8b8480)
- Accents: Dark brown (#3a3530) for buttons/active
- Borders: Light gray (#e8e4df)

### Status Colors
- Confirmed: Green-ish (#7a8b3a)
- Seated: Warm gold (#8b7a3a)
- Arriving: Orange (#8b6b3a)
- VIP: Rose/Red (#c41e3a)
- Cancelled: Light gray (#b5aca8)

---

## Implementation Notes

**Each screen maintains:**
- Same color palette
- Same typography (Playfair + Inter)
- Same spacing grid
- Same component library
- Mobile-first responsive approach
- No sidebars or desktop-only patterns
- Bottom navigation for primary navigation
- Consistent interaction patterns

**Data Layer (to implement later):**
- Mock data initially
- JavaScript state management
- Eventually: Backend API
- Local storage for offline capability
