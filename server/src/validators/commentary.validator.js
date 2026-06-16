import { z } from "zod";

const objectIdSchema = z.string().length(24, { message: "Must be a 24-character hex string" });

export const createCommentarySchema = z.object({
  body: z.object({
    matchId: objectIdSchema,
    over: z.coerce.number().min(0),
    ball: z.coerce.number().min(1).max(6),
    text: z.string().min(1).trim(),
    type: z.enum(["NORMAL", "FOUR", "SIX", "WICKET", "MILESTONE"]).default("NORMAL").optional(),
  }),
});

export const commentaryParamSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const getCommentaryByMatchSchema = z.object({
  params: z.object({
    matchId: objectIdSchema,
  }),
  query: z.object({
    limit: z.coerce.number().min(1).max(100).default(50).optional(),
    page: z.coerce.number().min(1).default(1).optional(),
  }).optional(),
});

export const commentaryMatchIdParamSchema = getCommentaryByMatchSchema;
export const commentaryIdParamSchema = commentaryParamSchema;
