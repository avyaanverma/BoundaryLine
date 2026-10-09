import mongoose from "mongoose";
import bcrypt from "bcrypt";
import env from "../config/env.js";
import connectDB from "../config/db.js";
import User from "../model/user.model.js";
import Team from "../model/team.model.js";
import Player from "../model/player.model.js";
import { TournamentModel } from "../model/tournament.model.js";
import { SeriesModel } from "../model/series.model.js";
import Match from "../model/match.model.js";
import { Score } from "../model/score.model.js";
import { Commentary } from "../model/commentary.model.js";

export async function seedDatabase() {
  console.log("[Seed] Connecting to MongoDB...");
  await connectDB();

  console.log("[Seed] Cleaning previous seed data idempotently...");

  // Seed Users
  const hashedPassword = await bcrypt.hash("password123", 10);
  
  const superAdminData = {
    name: "Super Admin",
    email: "superadmin@boundaryline.com",
    password: hashedPassword,
    role: "SUPER_ADMIN",
  };
  
  const adminData = {
    name: "League Admin",
    email: "admin@boundaryline.com",
    password: hashedPassword,
    role: "ADMIN",
  };

  const scorerData = {
    name: "Official Scorer",
    email: "scorer@boundaryline.com",
    password: hashedPassword,
    role: "SCORER",
  };

  const userData = {
    name: "Cricket Fan",
    email: "user@boundaryline.com",
    password: hashedPassword,
    role: "USER",
  };

  const superAdmin = await User.findOneAndUpdate({ email: superAdminData.email }, superAdminData, { upsert: true, new: true });
  const admin = await User.findOneAndUpdate({ email: adminData.email }, adminData, { upsert: true, new: true });
  const scorer = await User.findOneAndUpdate({ email: scorerData.email }, scorerData, { upsert: true, new: true });
  const user = await User.findOneAndUpdate({ email: userData.email }, userData, { upsert: true, new: true });

  console.log("[Seed] Users seeded cleanly.");

  // Seed Teams with crisp SVG logos
  const teamsData = [
    {
      name: "Mumbai Champions",
      shortName: "MUM",
      primaryColor: "#004BA0",
      logo: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23004BA0' stroke='%23FFD700' stroke-width='4'/><polygon points='50,15 58,35 80,35 62,48 68,70 50,56 32,70 38,48 20,35 42,35' fill='%23FFD700'/><text x='50' y='88' font-size='18' font-weight='bold' fill='white' text-anchor='middle' font-family='sans-serif'>MUMBAI</text></svg>`,
    },
    {
      name: "Delhi Strikers",
      shortName: "DEL",
      primaryColor: "#EF1B23",
      logo: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23EF1B23' stroke='%23004BA0' stroke-width='4'/><polygon points='50,12 60,40 45,40 55,88 35,50 50,50' fill='%23FFD700'/><text x='50' y='88' font-size='18' font-weight='bold' fill='white' text-anchor='middle' font-family='sans-serif'>DELHI</text></svg>`,
    },
    {
      name: "Bengaluru Royals",
      shortName: "BLR",
      primaryColor: "#EC1C24",
      logo: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23111' stroke='%23EC1C24' stroke-width='4'/><path d='M30,55 L35,30 L50,42 L65,30 L70,55 Z' fill='%23FFD700'/><circle cx='50' cy='68' r='12' fill='%23EC1C24'/><text x='50' y='90' font-size='16' font-weight='bold' fill='white' text-anchor='middle' font-family='sans-serif'>ROYALS</text></svg>`,
    },
    {
      name: "Chennai Kings",
      shortName: "CHE",
      primaryColor: "#FCCA06",
      logo: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23FCCA06' stroke='%23004BA0' stroke-width='4'/><path d='M30,35 Q50,15 70,35 Q50,50 30,35 Z' fill='%23004BA0'/><circle cx='50' cy='45' r='8' fill='%23EF1B23'/><text x='50' y='85' font-size='18' font-weight='bold' fill='%23004BA0' text-anchor='middle' font-family='sans-serif'>KINGS</text></svg>`,
    },
    {
      name: "Kolkata Knights",
      shortName: "KKR",
      primaryColor: "#3A225D",
      logo: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%233A225D' stroke='%23FFD700' stroke-width='4'/><path d='M50,18 L75,40 L65,75 L35,75 L25,40 Z' fill='%23FFD700'/><text x='50' y='60' font-size='22' font-weight='bold' fill='%233A225D' text-anchor='middle' font-family='sans-serif'>KKR</text></svg>`,
    },
    {
      name: "Rajasthan Warriors",
      shortName: "RR",
      primaryColor: "#EA1A85",
      logo: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23EA1A85' stroke='%23004BA0' stroke-width='4'/><path d='M30,30 L50,70 L70,30' stroke='white' stroke-width='10' fill='none'/><text x='50' y='88' font-size='16' font-weight='bold' fill='white' text-anchor='middle' font-family='sans-serif'>WARRIORS</text></svg>`,
    },
  ];

  const seededTeams = [];
  for (const t of teamsData) {
    const teamDoc = await Team.findOneAndUpdate({ shortName: t.shortName }, { ...t, createdBy: admin._id }, { upsert: true, new: true });
    seededTeams.push(teamDoc);
  }
  console.log(`[Seed] ${seededTeams.length} Teams seeded.`);

  // Seed Players
  const playersData = [
    { name: "Rohit Sharma", shortName: "R Sharma", role: "BATSMAN", battingStyle: "RIGHT_HAND", country: "India" },
    { name: "Virat Kohli", shortName: "V Kohli", role: "BATSMAN", battingStyle: "RIGHT_HAND", country: "India" },
    { name: "Jasprit Bumrah", shortName: "J Bumrah", role: "BOWLER", bowlingStyle: "RIGHT_ARM_FAST", country: "India" },
    { name: "Hardik Pandya", shortName: "H Pandya", role: "ALL_ROUNDER", battingStyle: "RIGHT_HAND", bowlingStyle: "RIGHT_ARM_MEDIUM", country: "India" },
    { name: "Rishabh Pant", shortName: "R Pant", role: "WICKET_KEEPER", battingStyle: "LEFT_HAND", country: "India" },
    { name: "KL Rahul", shortName: "KL Rahul", role: "BATSMAN", battingStyle: "RIGHT_HAND", country: "India" },
    { name: "Ravindra Jadeja", shortName: "R Jadeja", role: "ALL_ROUNDER", battingStyle: "LEFT_HAND", bowlingStyle: "LEFT_ARM_SPIN", country: "India" },
    { name: "Mohammed Shami", shortName: "M Shami", role: "BOWLER", bowlingStyle: "RIGHT_ARM_FAST", country: "India" },
  ];

  const seededPlayers = [];
  for (const p of playersData) {
    const playerDoc = await Player.findOneAndUpdate({ name: p.name }, { ...p, createdBy: admin._id }, { upsert: true, new: true });
    seededPlayers.push(playerDoc);
  }
  console.log(`[Seed] ${seededPlayers.length} Players seeded.`);

  // Seed Series & Tournament
  const seriesDoc = await SeriesModel.findOneAndUpdate(
    { name: "BoundaryLine Premier Cup 2026" },
    {
      name: "BoundaryLine Premier Cup 2026",
      format: "T20",
      startDate: new Date("2026-10-01"),
      endDate: new Date("2026-10-31"),
      status: "ONGOING",
      teams: seededTeams.map(t => t._id),
      createdBy: admin._id,
    },
    { upsert: true, new: true }
  );

  const tournamentDoc = await TournamentModel.findOneAndUpdate(
    { name: "Grassroots Champions Trophy" },
    {
      name: "Grassroots Champions Trophy",
      format: "T20",
      startDate: new Date("2026-10-05"),
      endDate: new Date("2026-10-25"),
      status: "LIVE",
      teams: seededTeams.map(t => t._id),
      createdBy: admin._id,
      authorizedScorers: [scorer._id],
    },
    { upsert: true, new: true }
  );
  console.log("[Seed] Series and Tournament seeded.");

  // Seed Matches (Live, Completed, Upcoming)
  const completedMatch = await Match.findOneAndUpdate(
    { matchNumber: "MATCH-01" },
    {
      seriesId: seriesDoc._id,
      matchNumber: "MATCH-01",
      venue: "Wankhede Stadium, Mumbai",
      startTime: new Date("2026-10-05T14:00:00Z"),
      status: "COMPLETED",
      team1: seededTeams[0]._id, // MUM
      team2: seededTeams[1]._id, // DEL
      tossWinner: seededTeams[0]._id,
      tossDecision: "BAT",
      winner: seededTeams[0]._id,
      result: "Mumbai Champions won by 18 runs",
      createdBy: admin._id,
    },
    { upsert: true, new: true }
  );

  const liveMatch = await Match.findOneAndUpdate(
    { matchNumber: "MATCH-02" },
    {
      seriesId: seriesDoc._id,
      matchNumber: "MATCH-02",
      venue: "M. Chinnaswamy Stadium, Bengaluru",
      startTime: new Date(),
      status: "LIVE",
      team1: seededTeams[2]._id, // BLR
      team2: seededTeams[3]._id, // CHE
      tossWinner: seededTeams[2]._id,
      tossDecision: "BAT",
      createdBy: admin._id,
    },
    { upsert: true, new: true }
  );

  const upcomingMatch = await Match.findOneAndUpdate(
    { matchNumber: "MATCH-03" },
    {
      seriesId: seriesDoc._id,
      matchNumber: "MATCH-03",
      venue: "Arun Jaitley Stadium, Delhi",
      startTime: new Date(Date.now() + 86400000 * 2), // 2 days later
      status: "UPCOMING",
      team1: seededTeams[1]._id, // DEL
      team2: seededTeams[3]._id, // CHE
      createdBy: admin._id,
    },
    { upsert: true, new: true }
  );

  console.log("[Seed] Completed, Live, and Upcoming Matches seeded.");

  // Seed Score records for Live and Completed matches
  await Score.findOneAndUpdate(
    { matchId: liveMatch._id, innings: 1 },
    {
      matchId: liveMatch._id,
      innings: 1,
      battingTeam: seededTeams[2]._id,
      score: 164,
      wickets: 4,
      overs: "18.2",
      runRate: 8.95,
      createdBy: scorer._id,
    },
    { upsert: true, new: true }
  );

  await Score.findOneAndUpdate(
    { matchId: completedMatch._id, innings: 1 },
    {
      matchId: completedMatch._id,
      innings: 1,
      battingTeam: seededTeams[0]._id,
      score: 185,
      wickets: 5,
      overs: "20.0",
      runRate: 9.25,
      createdBy: scorer._id,
    },
    { upsert: true, new: true }
  );

  await Score.findOneAndUpdate(
    { matchId: completedMatch._id, innings: 2 },
    {
      matchId: completedMatch._id,
      innings: 2,
      battingTeam: seededTeams[1]._id,
      score: 167,
      wickets: 9,
      overs: "20.0",
      runRate: 8.35,
      target: 186,
      createdBy: scorer._id,
    },
    { upsert: true, new: true }
  );

  console.log("[Seed] Scorecards seeded.");

  // Seed Commentary for Live Match
  const sampleCommentary = [
    { matchId: liveMatch._id, over: 18, ball: 2, text: "Bumrah to Kohli, FOUR! Beautiful cover drive past long-off!", type: "FOUR", runsScored: 4, extraRuns: 0, isLegalDelivery: true, createdBy: scorer._id },
    { matchId: liveMatch._id, over: 18, ball: 1, text: "Bumrah to Kohli, 2 runs, driven through midwicket for a double.", type: "NORMAL", runsScored: 2, extraRuns: 0, isLegalDelivery: true, createdBy: scorer._id },
    { matchId: liveMatch._id, over: 17, ball: 6, text: "Shami to Pant, OUT! Bowled him! Mid-stump knocked back!", type: "WICKET", runsScored: 0, extraRuns: 0, isLegalDelivery: true, createdBy: scorer._id },
  ];

  for (const comm of sampleCommentary) {
    await Commentary.findOneAndUpdate(
      { matchId: comm.matchId, over: comm.over, ball: comm.ball },
      comm,
      { upsert: true, new: true }
    );
  }

  console.log("[Seed] Commentary seeded cleanly.");
  console.log("[Seed] Database seeding completed successfully!");
}

// Auto-run when executed directly via node
if (process.argv[1] && process.argv[1].endsWith("seed.js")) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("[Seed Error]", err);
      process.exit(1);
    });
}
