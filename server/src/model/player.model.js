import mongoose from "mongoose";

const { Schema } = mongoose;

export const PLAYER_ROLE = {
  BATTER: "BATTER",
  BOWLER: "BOWLER",
  ALL_ROUNDER: "ALL_ROUNDER",
  WICKET_KEEPER: "WICKET_KEEPER",
};

export const BATTING_STYLE = {
  RIGHT_HAND: "RIGHT_HAND",
  LEFT_HAND: "LEFT_HAND",
};

export const BOWLING_STYLE = {
  RIGHT_ARM_FAST: "RIGHT_ARM_FAST",
  LEFT_ARM_FAST: "LEFT_ARM_FAST",
  RIGHT_ARM_MEDIUM: "RIGHT_ARM_MEDIUM",
  LEFT_ARM_MEDIUM: "LEFT_ARM_MEDIUM",
  OFF_SPIN: "OFF_SPIN",
  LEG_SPIN: "LEG_SPIN",
  LEFT_ARM_ORTHODOX: "LEFT_ARM_ORTHODOX",
  LEFT_ARM_CHINAMAN: "LEFT_ARM_CHINAMAN",
  NONE: "NONE",
};

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    shortName: {
      type: String,
      trim: true,
      default: "",
    },
    role: {
      type: String,
      enum: Object.values(PLAYER_ROLE),
      required: true,
    },
    battingStyle: {
      type: String,
      enum: Object.values(BATTING_STYLE),
      default: BATTING_STYLE.RIGHT_HAND,
    },
    bowlingStyle: {
      type: String,
      enum: Object.values(BOWLING_STYLE),
      default: BOWLING_STYLE.NONE,
    },
    country: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

playerSchema.index({ isDeleted: 1, name: 1 });
playerSchema.index({ isDeleted: 1, role: 1 });

const Player =
  mongoose.models.Player || mongoose.model("Player", playerSchema);

export default Player;
