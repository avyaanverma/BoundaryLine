import { z } from "zod";
import { ROLES } from "../constant/role.constant.js";

export const createUserSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters"),

      email: z
        .string()
        .trim()
        .email("A valid email is required"),

      password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .optional(),

      googleId: z
        .string()
        .trim()
        .optional(),

      picture: z
        .string()
        .trim()
        .url("Picture must be a valid URL")
        .optional(),

      role: z
        .enum(Object.values(ROLES))
        .optional(),
    })
    .superRefine((data, ctx) => {
      // Password required only when googleId does not exist
      if (!data.googleId && !data.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["password"],
          message: "Password is required if googleId is not provided",
        });
      }
    }),
});

export const updateUserRoleSchema = z.object({
  params: z.object({
    id: z.string().trim().min(1, "User id is required"),
  }),

  body: z.object({
    role: z.enum(Object.values(ROLES)),
  }),
});

export const userIdParamSchema = z.object({
  params: z.object({
    id: z.string().trim().min(1, "User id is required"),
  }),
});

export const userQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional().default(1),
    limit: z.coerce.number().min(1).max(100).optional().default(10),
  }),
});