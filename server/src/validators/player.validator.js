import { z } from "zod";
import {
  BATTING_STYLE,
  BOWLING_STYLE,
  PLAYER_ROLE,
} from "../model/player.model.js";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

function hasAtLeastOnePlayerField(payload) {
  return Object.keys(payload).length > 0;
}

const playerBodySchema = z.object({
  name: z.string().trim().min(2).max(80),
  shortName: z.string().trim().max(30).optional(),
  role: z.enum(Object.values(PLAYER_ROLE)),
  battingStyle: z.enum(Object.values(BATTING_STYLE)).optional(),
  bowlingStyle: z.enum(Object.values(BOWLING_STYLE)).optional(),
  country: z.string().trim().max(60).optional(),
  image: z.string().trim().optional(),
});

export const playerIdParamSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const createPlayerSchema = z.object({
  body: playerBodySchema,
});

export const updatePlayerSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: playerBodySchema.partial().refine(hasAtLeastOnePlayerField, {
    message: "At least one player field is required",
  }),
});

export const listPlayersSchema = z.object({
  query: z.object({
    role: z.enum(Object.values(PLAYER_ROLE)).optional(),
  }),
});
