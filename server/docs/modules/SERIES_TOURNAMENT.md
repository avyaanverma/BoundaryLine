# Series & Tournament Module

This module handles the grouping of matches into larger events.

## 🏆 Tournaments

A Tournament is the highest level of grouping (e.g., "World Cup 2023", "IPL 2024").

### Data Structure (`TournamentModel`)
- `name`: Name of the tournament.
- `startDate`: Start date.
- `endDate`: End date.
- `format`: Enum (`T20`, `ODI`, `TEST`).

### Management
- **Public**: `GET /api/tournaments`
- **Private**: `POST /api/private/tournaments` (Admin only)

## 📅 Series

A Series can be part of a tournament or a standalone bilateral series (e.g., "India vs Australia T20 Series").

### Data Structure (`SeriesModel`)
- `name`: Name of the series.
- `tournamentId`: (Optional) Reference to a Tournament.
- `format`: Enum (`T20`, `ODI`, `TEST`).
- `teamIds`: Array of teams participating in the series.

### Management
- **Public**: `GET /api/series`
- **Private**: `POST /api/private/series` (Admin only)

## 🔗 Relationship

1. **Tournament** contains multiple **Series**.
2. **Series** contains multiple **Matches**.
3. **Matches** have **Scores**, **Commentary**, and **Playing XIs**.
