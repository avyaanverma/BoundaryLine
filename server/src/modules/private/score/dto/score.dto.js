import { z } from "zod";

export const createScoreSchema = z.object({
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
});
export const updateScoreSchema = z.object({
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
});
export const matchParamSchema = z.object({
  params: z.object({
    matchId: z.string().min(1, "Match ID is required"),
  }),
});
export const scoreParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Score ID is required"),
  }),
});
export default class ScoreDTO {
  constructor(score) {
    this.id = score._id;
    this.matchId = score.matchId;
    this.innings = score.innings;
    this.battingTeam = score.battingTeam;
    this.score = score.score;
    this.wickets = score.wickets;
    this.overs = score.overs;
    this.runRate = score.runRate;
    this.target = score.target;
    this.createdBy = score.createdBy;
    this.updatedBy = score.updatedBy;
    this.createdAt = score.createdAt;
    this.updatedAt = score.updatedAt;
  }
}
