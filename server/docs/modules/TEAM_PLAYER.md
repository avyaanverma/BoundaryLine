# Teams & Players Module

This module manages the core entities of the cricket ecosystem: Teams and Players.

## 👥 Players

Players are the individual athletes. They are linked to teams and matches.

### Data Structure (`PlayerModel`)
- `name`: Full name of the player.
- `role`: Enum (`BATSMAN`, `BOWLER`, `ALL_ROUNDER`, `WICKET_KEEPER`).
- `battingStyle`: e.g., "Right-hand bat".
- `bowlingStyle`: e.g., "Right-arm fast".
- `country`: Nationality.

### Management
- **Public**: `GET /api/players` - List players.
- **Private**: `POST /api/private/players` - Create/Update players (Admin only).

## 🛡️ Teams

Teams represent national or domestic sides.

### Data Structure (`TeamModel`)
- `name`: Full name of the team.
- `shortName`: e.g., "IND", "AUS".
- `logo`: URL to the team's logo.
- `country`: Country represented.

### Management
- **Public**: `GET /api/teams` - List teams.
- **Private**: `POST /api/private/teams` - Create/Update teams (Admin only).

## 📊 Squads

Squads bridge teams and series/tournaments. A team might have a different squad for each series.

### Data Structure (`SquadModel`)
- `teamId`: Reference to the Team.
- `seriesId`: Reference to the Series.
- `players`: Array of Player references.

### Management
- `POST /api/private/squads`: Assign players to a team for a specific series.
