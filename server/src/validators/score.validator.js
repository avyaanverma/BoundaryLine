import { z } from "zod";

export const createScoreSchema = {
  body: z.object({
    matchId: z.string().min(1, "Match ID is required"),
    innings: z.number().int().positive(),
    battingTeam: z.string().min(1, "Batting team is required"),
    score: z.number().min(0),
    wickets: z.number().min(0).optional(),
    overs: z.number().min(0).optional(),
    runRate: z.number().min(0).optional(),
    target: z.number().min(0).optional(),
  }),
};

export const updateScoreSchema = {
  params: z.object({
    id: z.string().min(1, "Score ID is required"),
  }),
  body: z.object({
    innings: z.number().int().positive().optional(),
    battingTeam: z.string().min(1).optional(),
    score: z.number().min(0).optional(),
    wickets: z.number().min(0).optional(),
    overs: z.number().min(0).optional(),
    runRate: z.number().min(0).optional(),
    target: z.number().min(0).optional(),
  }),
};

export const matchParamSchema = {
  params: z.object({
    matchId: z.string().min(1, "Match ID is required"),
  }),
};

export const scoreParamSchema = {
  params: z.object({
    id: z.string().min(1, "Score ID is required"),
  }),
};
