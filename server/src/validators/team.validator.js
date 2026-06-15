import { z } from "zod";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

function hasAtLeastOneTeamField(payload) {
  // What: confirm PATCH body contains at least one editable field.
  // Why: empty update requests should fail before they reach service logic.
  // How: count object keys and require one or more fields.
  return Object.keys(payload).length > 0;
}

export const teamIdParamSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const createTeamSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(80),
    shortName: z.string().trim().min(2).max(10),
    logo: z.string().trim().min(1),
    primaryColor: z.string().trim().min(3).max(20).optional(),
    squadPlayers: z.array(objectIdSchema).optional(),
  }),
});

export const updateTeamSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      name: z.string().trim().min(2).max(80).optional(),
      shortName: z.string().trim().min(2).max(10).optional(),
      logo: z.string().trim().min(1).optional(),
      primaryColor: z.string().trim().min(3).max(20).optional(),
      squadPlayers: z.array(objectIdSchema).optional(),
    })
    .refine(hasAtLeastOneTeamField, {
      message: "At least one team field is required",
    }),
});
