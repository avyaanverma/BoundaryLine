import mongoose from "mongoose";

// Lightweight User schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    role: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Lightweight Player schema
const playerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Lightweight Team schema
const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Lightweight Match schema
const matchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["UPCOMING", "LIVE", "INNINGS_BREAK", "COMPLETED"],
      default: "LIVE",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);
export const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);
export const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);
