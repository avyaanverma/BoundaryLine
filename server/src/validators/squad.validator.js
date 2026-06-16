import mongoose from "mongoose";
import { z } from "zod";

const objectIdSchema = z.string().refine(
  (value) => mongoose.Types.ObjectId.isValid(value),
  {
    message: "Invalid ObjectId",
  }
);

export const createSquadSchema = {
  body: z.object({
    seriesId: objectIdSchema,
    teamId: objectIdSchema,
    players: z.array(objectIdSchema).min(1, "Squad must have at least 1 player"),
  }),
};

export const updateSquadSchema = {
  body: z.object({
    players: z.array(objectIdSchema).min(1).optional(),
  }),
};

export const squadIdSchema = {
  params: z.object({
    id: objectIdSchema,
  }),
};
