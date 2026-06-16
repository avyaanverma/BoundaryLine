import mongoose from "mongoose";
import { z } from "zod";

const objectIdSchema = z.string().refine(
  (value) => mongoose.Types.ObjectId.isValid(value),
  {
    message: "Invalid ObjectId",
  }
);

export const createPlayingXISchema = {
  body: z.object({
    matchId: objectIdSchema,
    teamId: objectIdSchema,
    players: z.array(objectIdSchema).length(11, "Playing XI must have exactly 11 players"),
    captain: objectIdSchema,
    viceCaptain: objectIdSchema,
    wicketKeeper: objectIdSchema,
  }),
};

export const updatePlayingXISchema = {
  body: z.object({
    players: z.array(objectIdSchema).length(11).optional(),
    captain: objectIdSchema.optional(),
    viceCaptain: objectIdSchema.optional(),
    wicketKeeper: objectIdSchema.optional(),
  }),
};

export const playingXIIdSchema = {
  params: z.object({
    id: objectIdSchema,
  }),
};
