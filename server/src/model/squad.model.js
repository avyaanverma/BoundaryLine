import mongoose from "mongoose";

const { Schema } = mongoose;

const squadSchema = new Schema(
  {
    seriesId: {
      type: Schema.Types.ObjectId,
      ref: "Series",
      required: true,
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
        required: true,
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

squadSchema.index({ seriesId: 1, teamId: 1, isDeleted: 1 });
squadSchema.index({ teamId: 1, isDeleted: 1 });

const Squad = mongoose.models.Squad || mongoose.model("Squad", squadSchema);

export default Squad;
