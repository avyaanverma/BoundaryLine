import mongoose from "mongoose";

const adminDashboardSchema = new mongoose.Schema(
  {
    totalMatches: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalUsers: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalPlayers: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalTeams: {
      type: Number,
      default: 0,
      min: 0,
    },
    activeLiveMatches: {
      type: Number,
      default: 0,
      min: 0,
    },
    completedMatches: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

export const AdminDashboard =
  mongoose.models.AdminDashboard ||
  mongoose.model("AdminDashboard", adminDashboardSchema);
