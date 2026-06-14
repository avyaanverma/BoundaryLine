import mongoose from "mongoose";

const commentarySchema = new mongoose.Schema(
  {
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    over: {
      type: Number,
      required: true,
      min: 0,
    },
    ball: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["NORMAL", "FOUR", "SIX", "WICKET", "MILESTONE"],
      default: "NORMAL",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

commentarySchema.index({ matchId: 1, createdAt: -1 });

export const Commentary =
  mongoose.models.Commentary || mongoose.model("Commentary", commentarySchema);
