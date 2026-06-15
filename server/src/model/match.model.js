import mongoose from "mongoose";

const { Schema } = mongoose;

export const MATCH_STATUS = {
  UPCOMING: "UPCOMING",
  TOSS_COMPLETED: "TOSS_COMPLETED",
  PLAYING_XI_SELECTED: "PLAYING_XI_SELECTED",
  LIVE: "LIVE",
  INNINGS_BREAK: "INNINGS_BREAK",
  COMPLETED: "COMPLETED",
};

const playingXiPlayerSchema = new Schema(
  {
    player: {
      type: Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    isCaptain: {
      type: Boolean,
      default: false,
    },
    isWicketKeeper: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const matchSchema = new Schema(
  {
    seriesId: {
      type: Schema.Types.ObjectId,
      ref: "Series",
      required: true,
    },
    matchNumber: {
      type: String,
      trim: true,
      default: "",
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(MATCH_STATUS),
      default: MATCH_STATUS.UPCOMING,
    },
    team1: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    team2: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    tossWinner: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },
    tossDecision: {
      type: String,
      enum: ["BAT", "BOWL", null],
      default: null,
    },
    playingXI: {
      team1: {
        type: [playingXiPlayerSchema],
        default: [],
      },
      team2: {
        type: [playingXiPlayerSchema],
        default: [],
      },
    },
    winner: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },
    result: {
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

matchSchema.index({ status: 1, startTime: 1, isDeleted: 1 });
matchSchema.index({ seriesId: 1, startTime: 1, isDeleted: 1 });
matchSchema.index({ team1: 1, startTime: 1, isDeleted: 1 });
matchSchema.index({ team2: 1, startTime: 1, isDeleted: 1 });

const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);

export default Match;
