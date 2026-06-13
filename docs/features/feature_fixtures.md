# Fixtures Page Documentation

## Overview

The Fixtures Page provides users with a centralized location to view live, upcoming, and completed cricket matches. It allows users to browse schedules, track match statuses, set reminders, and access match-related information.

---

## Feature Purpose

The purpose of this feature is to:

* Display today's matches.
* Display tomorrow's fixtures.
* Show upcoming matches later in the month.
* Highlight live matches.
* Display completed match results.
* Allow filtering by match format.
* Support multiple viewing modes.

---

# Page Structure

```text
FixturesPage
│
├── TopNav
├── Sidebar
├── FiltersBar
├── ViewToggle
│
├── Today Section
│   ├── MatchCardFull
│   ├── MatchCardCountdown
│   └── MatchCardResult
│
├── Tomorrow Section
│   └── TomorrowRow
│
├── Later This Month Section
│   ├── MiniMatchCard
│   └── View Full Month Card
│
└── Footer
```

---

# Component Documentation

## GlassPanel

### Description

Reusable wrapper component responsible for maintaining a consistent glassmorphism design across the application.

### Responsibilities

* Applies backdrop blur.
* Provides border styling.
* Creates reusable card containers.

### Props

| Prop      | Type      | Description              |
| --------- | --------- | ------------------------ |
| children  | ReactNode | Content inside panel     |
| className | string    | Additional custom styles |

---

## StatusBadge

### Description

Displays the current match status.

### Supported Status Values

| Status   | Description                |
| -------- | -------------------------- |
| LIVE     | Match is currently running |
| UPCOMING | Match has not started      |
| RESULT   | Match has finished         |

### Features

* Live pulse animation
* Color-coded statuses

---

## FormatPill

### Description

Displays the match format badge.

### Supported Formats

* T20
* T20I
* ODI
* TEST

---

## SectionDivider

### Description

Separates major fixture sections visually.

### Example

```text
Today - OCT 24
Tomorrow - OCT 25
Later This Month
```

---

## NotifyButton

### Description

Provides notification/reminder functionality for matches.

### Future Integration

* Push notifications
* Email reminders
* In-app alerts

---

# Match Components

## MatchCardFull

### Description

Displays detailed information for live and active matches.

### Features

* Match status
* Team information
* Scores
* Series information
* Venue information
* Match actions

### Props

```javascript
{
  format,
  seriesName,
  subtitle,
  status,
  team1,
  team2,
  footer
}
```

### Example Usage

* Live international match
* Ongoing domestic match
* Active tournament fixture

---

## MatchCardResult

### Description

Displays completed match information.

### Features

* Final scores
* Match result
* Winning team
* Highlights action
* Share functionality

### Example

```text
Pakistan won by 8 wickets
```

---

## MatchCardCountdown

### Description

Displays upcoming matches with a live countdown timer.

### Features

* Real-time countdown
* Reminder button
* Match preview

### Internal State

```javascript
const [time, setTime] = useState(countdown);
```

### Lifecycle

Uses `useEffect()` and `setInterval()` to update countdown every second.

---

## TomorrowRow

### Description

Compact layout for displaying upcoming fixtures scheduled for tomorrow.

### Displays

* Match time
* Teams
* Venue
* Tournament information
* Reminder action

---

## MiniMatchCard

### Description

Compact card used for future fixtures.

### Displays

* Match date
* Match format
* Team names
* Reminder button

---

# Navigation Components

## Sidebar

### Description

Provides application navigation.

### Navigation Items

* Dashboard
* Analytics
* Matches
* Settings
* Support

### Additional Actions

* Create Match
* Logout

---

## TopNav

### Description

Primary application navigation bar.

### Navigation Links

* Scores
* Schedule
* Teams
* Players
* Rankings
* News

### User Actions

* Search
* Login
* Signup

---

# Filters System

## FiltersBar

### Description

Allows users to filter displayed fixtures.

### Available Filters

#### Match Category

* International
* Domestic
* All Matches

#### Match Format

* All Formats
* T20
* ODI
* Test

### State

```javascript
const [activeFormat, setActiveFormat] = useState("All Formats");
```

### Additional Information

Displays currently active live match count.

---

# View Management

## ViewToggle

### Description

Allows users to switch between different fixture layouts.

### Available Views

| View     | Description            |
| -------- | ---------------------- |
| List     | Default fixture layout |
| Calendar | Calendar-based layout  |

### State

```javascript
const [view, setView] = useState("list");
```

---

# State Management

## FixturesPage

```javascript
const [view, setView] = useState("list");
```

Responsible for:

* View switching
* Layout management

---

## FiltersBar

```javascript
const [activeFormat, setActiveFormat] = useState("All Formats");
```

Responsible for:

* Match format filtering

---

## MatchCardCountdown

```javascript
const [time, setTime] = useState(countdown);
```

Responsible for:

* Countdown timer updates

---

# Styling System

## Theme Colors

### Primary

```css
#94d5a5
```

### Secondary

```css
#97d940
```

### Tertiary

```css
#ffb3b0
```

### Background

```css
#111316
```

### Surface

```css
#1e2023
```

---

# Responsive Design

## Desktop

* Sidebar visible
* Multi-column layouts
* Full navigation menu

## Tablet

* Reduced grid columns
* Responsive spacing

## Mobile

* Sidebar hidden
* Stacked cards
* Simplified layout

---

# User Flow

1. User opens Fixtures Page.
2. User browses today's matches.
3. User filters matches by format.
4. User switches between List and Calendar view.
5. User checks upcoming fixtures.
6. User sets reminders for future matches.
7. User views scorecards and results.

---

# Future Improvements

## Planned Features

* Live API integration
* Real-time score updates
* Google OAuth integration
* Team-specific filtering
* Venue filtering
* Search functionality
* Push notifications
* Calendar export
* Favourite teams
* Match prediction system
* Infinite scrolling

---

# Dependencies

## React

```javascript
useState
useEffect
```

## Icons

```text
lucide-react
```

## Styling

```text
Tailwind CSS
```

---

# Current Limitations

* Uses static mock data.
* Match actions are not connected to APIs.
* Countdown values are hardcoded.
* Notification functionality is not implemented.
* Calendar view is not yet implemented.

---

# Production Requirements

Before deployment:

* Connect fixtures API.
* Connect live scoring API.
* Implement authentication.
* Store user reminders.
* Add notification service.
* Implement calendar view.
* Add routing for match details.
