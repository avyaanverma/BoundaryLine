import { z } from "zod";

const objectIdSchema = z.string().length(24, { message: "Must be a 24-character hex string" });

const dismissalSchema = z.object({
  type: z.enum(["BOWLED", "CAUGHT", "LBW", "RUN_OUT", "STUMPED", "HIT_WICKET", "RETIRED_HURT"]).nullable().optional(),
  playerOutId: objectIdSchema.optional(),
  fielderId: objectIdSchema.optional(),
  bowlerId: objectIdSchema.optional(),
}).optional().nullable();

export const createCommentarySchema = z.object({
  body: z.object({
    matchId: objectIdSchema,
    over: z.coerce.number().min(0),
    ball: z.coerce.number().min(1).max(6),
    text: z.string().min(1).trim(),
    type: z.enum(["NORMAL", "FOUR", "SIX", "WICKET", "MILESTONE"]).default("NORMAL").optional(),
    // --- Enriched ball-event fields (all optional, backward-compatible) ---
    innings: z.coerce.number().int().min(1).max(2).optional(),
    runsScored: z.coerce.number().min(0).default(0).optional(),
    extraRuns: z.coerce.number().min(0).default(0).optional(),
    isLegalDelivery: z.boolean().default(true).optional(),
    batterId: objectIdSchema.optional().nullable(),
    bowlerId: objectIdSchema.optional().nullable(),
    nonStrikerId: objectIdSchema.optional().nullable(),
    dismissal: dismissalSchema,
  }),
});

export const commentaryParamSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const getCommentaryByMatchSchema = {
  params: z.object({
    matchId: objectIdSchema,
  }),
  query: z.object({
    limit: z.coerce.number().min(1).max(100).default(50).optional(),
    page: z.coerce.number().min(1).default(1).optional(),
  }).optional(),
};

export const commentaryMatchIdParamSchema = getCommentaryByMatchSchema;
export const commentaryIdParamSchema = commentaryParamSchema;
