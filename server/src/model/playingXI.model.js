import mongoose from "mongoose";

const playingXISchema = new mongoose.Schema(
  {
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },

    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: true,
      },
    ],

    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },

    viceCaptain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },

    wicketKeeper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Exactly 11 Players
 */
playingXISchema.path("players").validate(
  function (players) {
    return players.length === 11;
  },
  "Playing XI must contain exactly 11 players"
);

/**
 * No duplicate players
 */
playingXISchema.path("players").validate(
  function (players) {
    return (
      new Set(players.map((id) => id.toString())).size ===
      players.length
    );
  },
  "Duplicate players are not allowed"
);

/**
 * Captain, Vice Captain and Wicket Keeper
 * must be part of Playing XI
 */
playingXISchema.pre("save", function (next) {
  const playerIds = this.players.map((id) =>
    id.toString()
  );

  if (
    !playerIds.includes(this.captain.toString())
  ) {
    return next(
      new Error(
        "Captain must be part of Playing XI"
      )
    );
  }

  if (
    !playerIds.includes(
      this.viceCaptain.toString()
    )
  ) {
    return next(
      new Error(
        "Vice Captain must be part of Playing XI"
      )
    );
  }

  if (
    !playerIds.includes(
      this.wicketKeeper.toString()
    )
  ) {
    return next(
      new Error(
        "Wicket Keeper must be part of Playing XI"
      )
    );
  }

  next();
});

playingXISchema.index(
  {
    matchId: 1,
    teamId: 1,
  },
  {
    unique: true,
  }
);

export const PlayingXIModel = mongoose.models.PlayingXI || mongoose.model(
  "PlayingXI",
  playingXISchema
);
