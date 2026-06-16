import mongoose from "mongoose";

const { Schema } = mongoose;

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    shortName: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },
    logo: {
      type: String,
      required: true,
      trim: true,
    },
    primaryColor: {
      type: String,
      trim: true,
      default: "#16a34a",
    },
    squadPlayers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
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

teamSchema.index({ isDeleted: 1, name: 1 });
teamSchema.index({ isDeleted: 1, shortName: 1 });

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;
