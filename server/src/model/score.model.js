import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    innings: {
      type: Number,
      required: true,
      min: 1,
      max: 2,
    },
    battingTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
    },
    wickets: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    overs: {
      type: String,
      default: "0.0",
      match: /^\d+\.[0-5]$/,
    },
    runRate: {
      type: Number,
      default: 0,
      min: 0,
    },
    target: {
      type: Number,
      min: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

scoreSchema.index({ matchId: 1, innings: 1 });

export const Score =
  mongoose.models.Score || mongoose.model("Score", scoreSchema);
