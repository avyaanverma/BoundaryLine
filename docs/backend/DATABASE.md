# Database Design

> **MongoDB | Mongoose ODM | 10 Collections | Soft-Delete Pattern | Compound Indexes**

---

## 5. Database Design

BoundaryLine uses MongoDB for its flexibility with nested documents, rich querying, and schema-less nature suited for cricket data that varies by format.

### Collections Overview

| Collection | Documents | Purpose |
|-----------|-----------|---------|
| `users` | User | Authentication, roles, profiles |
| `teams` | Team | Cricket teams (name, logo, colors) |
| `players` | Player | Individual player profiles |
| `series` | Series | Match groupings (bilateral series) |
| `tournaments` | Tournament | Multi-team competition groupings |
| `matches` | Match | Individual cricket matches with lifecycle |
| `squads` | Squad | Team-player assignment per series |
| `playingxis` | PlayingXI | Playing XI submissions per match per team |
| `scores` | Score | Innings-based score tracking |
| `commentaries` | Commentary | Ball-by-ball commentary with enriched data |
| `admindashboards` | AdminDashboard | Cached admin dashboard statistics |

### Common Patterns

#### Soft Delete
Every collection uses `isDeleted: Boolean, default: false` for safe deletions:
```js
// All repository queries filter by this
{ isDeleted: false }
```

#### Audit Trail
Write collections include `createdBy` and `updatedBy` referencing the User model.

#### Timestamps
All schemas enable `{ timestamps: true }` for `createdAt`/`updatedAt`.

---

## 6. ER Diagram Description

```
User ──── creates/modiﬁes ────┐
  │                            │
  │  (role: SUPER_ADMIN,       ├── Match ────── Series
  │        ADMIN, SCORER)      │     │             │
  │                            │     │             │
  └────────────────────────────┘     │             │
                                     │             │
Team ─────────── Squad ──────────────┤             │
  │                │                 │             │
  │        (seriesId + teamId)       │             │
  │                                  │             │
  ├── PlayingXI ─────────────────────┤             │
  │       │                          │             │
  │   (matchId + teamId)             │             │
  │                                  │             │
  ├── Score ─────────────────────────┤             │
  │       │                          │             │
  │   (matchId + innings)            │             │
  │                                  │             │
  └── Commentary ────────────────────┘             │
            │                                      │
        (matchId)                                  │
                                                   │
Tournament ◄──── (future: tournamentId in Series)
```

### Entity Relationships

| Relationship | Type | Description |
|-------------|------|-------------|
| Series → Match | 1:N | One series contains many matches |
| Tournament → Series | 1:N | One tournament may contain many series |
| Team → Player | M:N | Via Squad (series-specific assignment) |
| Team → Match | M:N | Team appears as team1/team2 in matches |
| Match → Score | 1:N | One match has 1-2 innings scores |
| Match → Commentary | 1:N | One match has many ball-by-ball entries |
| Match → PlayingXI | 1:2 | One match may have 2 Playing XIs (one per team) |
| User → (all) | 1:N | User creates/updates resources |

---

## 13. Database Schemas

### User Schema

```js
{
  name:              String (required, trimmed),
  email:             String (required, unique, lowercase),
  googleId:          String (unique, sparse),  // OAuth users
  password:          String (min 6, select: false),  // bcrypt hashed
  role:              Enum ["SUPER_ADMIN", "ADMIN", "SCORER"] (default: SCORER),
  isDeleted:         Boolean (default: false),
  picture:           String (default URL),
}
// Pre-save hook: bcrypt.hash(password, 10)
// Method: comparePassword(candidatePassword)
```

### Match Schema

```js
{
  seriesId:          ObjectId (ref: "Series", required),
  matchNumber:       String,
  venue:             String (required),
  startTime:         Date (required),
  status:            Enum [UPCOMING, TOSS_COMPLETED, PLAYING_XI_SELECTED,
                           LIVE, INNINGS_BREAK, COMPLETED],
  team1:             ObjectId (ref: "Team"),
  team2:             ObjectId (ref: "Team"),
  tossWinner:        ObjectId (ref: "Team"),
  tossDecision:      Enum ["BAT", "BOWL"],
  playingXI: {
    team1: [{ player: ObjectId, isCaptain: Boolean, isWicketKeeper: Boolean }],
    team2: [{ player: ObjectId, isCaptain: Boolean, isWicketKeeper: Boolean }],
  },
  winner:            ObjectId (ref: "Team"),
  result:            String,
  isDeleted:         Boolean,
  createdBy/updatedBy: ObjectId (ref: "User"),
}
// Indexes: status+startTime, seriesId+startTime, team1+startTime, team2+startTime
```

### Team Schema

```js
{
  name:              String (required, unique, trimmed),
  shortName:         String (required, unique, uppercase),
  logo:              String (required, URL),
  primaryColor:      String (default: "#16a34a"),
  squadPlayers:      [ObjectId (ref: "Player")],
  isDeleted:         Boolean,
}
// Indexes: name, shortName
```

### Player Schema

```js
{
  name:              String (required, trimmed),
  shortName:         String,
  role:              Enum [BATTER, BOWLER, ALL_ROUNDER, WICKET_KEEPER] (required),
  battingStyle:      Enum [RIGHT_HAND, LEFT_HAND],
  bowlingStyle:      Enum [RIGHT_ARM_FAST, LEFT_ARM_FAST, RIGHT_ARM_MEDIUM,
                           LEFT_ARM_MEDIUM, OFF_SPIN, LEG_SPIN,
                           LEFT_ARM_ORTHODOX, LEFT_ARM_CHINAMAN, NONE],
  country:           String,
  image:             String,
  isDeleted:         Boolean,
}
// Indexes: isDeleted+name, isDeleted+role
```

### Series Schema

```js
{
  name:              String (required, trimmed),
  format:            Enum [T5, T10, T20, ODI, TEST] (default: T5),
  startDate:         Date (required),
  endDate:           Date (required),
  status:            Enum [UPCOMING, ONGOING, COMPLETED] (default: UPCOMING),
  teams:             [ObjectId (ref: "Team")],
  winnerTeam:        ObjectId (ref: "Team"),
  isDeleted:         Boolean,
}
// Validator: teams.length >= 2
// Validator: endDate >= startDate
```

### Score Schema

```js
{
  matchId:           ObjectId (ref: "Match", required),
  innings:           Number (1-2, required),
  battingTeam:       ObjectId (ref: "Team", required),
  score:             Number (default: 0),
  wickets:           Number (0-10, default: 0),
  overs:             String (format: "X.Y", default: "0.0"),
  runRate:           Number (default: 0),
  target:            Number,
  isDeleted:         Boolean,
}
// Index: matchId+innings
```

### Commentary Schema

```js
{
  matchId:           ObjectId (ref: "Match", required),
  over:              Number (required),
  ball:              Number (1-6, required),
  text:              String (required),
  type:              Enum [NORMAL, FOUR, SIX, WICKET, MILESTONE] (default: NORMAL),
  // Enriched ball-by-ball fields
  innings:           Number (1-2),
  runsScored:        Number (default: 0),
  extraRuns:         Number (default: 0),
  isLegalDelivery:   Boolean (default: true),
  batterId:          ObjectId (ref: "Player"),
  bowlerId:          ObjectId (ref: "Player"),
  nonStrikerId:      ObjectId (ref: "Player"),
  dismissal: {
    type:            Enum [BOWLED, CAUGHT, LBW, RUN_OUT, STUMPED, HIT_WICKET, RETIRED_HURT],
    playerOutId:     ObjectId (ref: "Player"),
    fielderId:       ObjectId (ref: "Player"),
    bowlerId:        ObjectId (ref: "Player"),
  },
}
// Index: matchId+createdAt
```

### Squad Schema

```js
{
  seriesId:          ObjectId (ref: "Series", required),
  teamId:            ObjectId (ref: "Team", required),
  players:           [ObjectId (ref: "Player", required)],
  isDeleted:         Boolean,
}
// Index: seriesId+teamId+isDeleted (compound unique)
```

### PlayingXI Schema

```js
{
  matchId:           ObjectId (ref: "Match", required),
  teamId:            ObjectId (ref: "Team", required),
  players:           [ObjectId (ref: "Player")],  // Exactly 11
  captain:           ObjectId (ref: "Player", required),
  viceCaptain:       ObjectId (ref: "Player", required),
  wicketKeeper:      ObjectId (ref: "Player", required),
  isDeleted:         Boolean,
}
// Validators: exactly 11 players, no duplicates
// Pre-save: captain/viceCaptain/wicketKeeper must be in players
// Index: matchId+teamId (unique)
```

### Tournament Schema

```js
{
  name:              String (required, trimmed),
  format:            Enum [T5, T10, T20, ODI, TEST] (default: T5),
  startDate:         Date (required),
  endDate:           Date (required),
  status:            Enum [UPCOMING, ONGOING, COMPLETED] (default: UPCOMING),
  teams:             [ObjectId (ref: "Team")],
  winnerTeam:        ObjectId (ref: "Team"),
  isDeleted:         Boolean,
}
// Validator: endDate >= startDate
```

### AdminDashboard Schema

```js
{
  totalMatches:      Number (default: 0),
  totalUsers:        Number (default: 0),
  totalPlayers:      Number (default: 0),
  totalTeams:        Number (default: 0),
  activeLiveMatches: Number (default: 0),
  completedMatches:  Number (default: 0),
  lastUpdated:       Date,
  isDeleted:         Boolean,
}
```

---

## Match Format Constants

```js
FORMAT = { T5, T10, T20, ODI, TEST }
SERIES_STATUS = { UPCOMING, ONGOING, COMPLETED }
TOURNAMENT_STATUS = { UPCOMING, ONGOING, COMPLETED }
MATCH_STATUS = {
  UPCOMING, TOSS_COMPLETED, PLAYING_XI_SELECTED,
  LIVE, INNINGS_BREAK, COMPLETED
}
```

## Player Roles & Styles

```js
PLAYER_ROLE = { BATTER, BOWLER, ALL_ROUNDER, WICKET_KEEPER }
BATTING_STYLE = { RIGHT_HAND, LEFT_HAND }
BOWLING_STYLE = {
  RIGHT_ARM_FAST, LEFT_ARM_FAST, RIGHT_ARM_MEDIUM, LEFT_ARM_MEDIUM,
  OFF_SPIN, LEG_SPIN, LEFT_ARM_ORTHODOX, LEFT_ARM_CHINAMAN, NONE
}
```

## Dismissal Types

```
BOWLED, CAUGHT, LBW, RUN_OUT, STUMPED, HIT_WICKET, RETIRED_HURT
```
