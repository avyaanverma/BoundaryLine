import { z } from "zod";
import { MATCH_STATUS } from "../model/match.model.js";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");
const tossDecisionSchema = z.enum(["BAT", "BOWL"]);

function hasAtLeastOneMatchField(payload) {
  // What: confirm PATCH body contains at least one editable field.
  // Why: empty update requests should fail before service logic runs.
  // How: count payload keys and require one or more fields.
  return Object.keys(payload).length > 0;
}

export const matchIdParamSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const createMatchSchema = z.object({
  body: z.object({
    seriesId: objectIdSchema,
    team1: objectIdSchema,
    team2: objectIdSchema,
    venue: z.string().trim().min(2).max(140),
    startTime: z.coerce.date(),
    matchNumber: z.string().trim().max(40).optional(),
  }),
});

export const updateMatchSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      seriesId: objectIdSchema.optional(),
      team1: objectIdSchema.optional(),
      team2: objectIdSchema.optional(),
      venue: z.string().trim().min(2).max(140).optional(),
      startTime: z.coerce.date().optional(),
      matchNumber: z.string().trim().max(40).optional(),
      status: z.enum(Object.values(MATCH_STATUS)).optional(),
      tossWinner: objectIdSchema.optional(),
      tossDecision: tossDecisionSchema.optional(),
      winner: objectIdSchema.optional(),
      result: z.string().trim().max(240).optional(),
    })
    .refine(hasAtLeastOneMatchField, {
      message: "At least one match field is required",
    }),
});
