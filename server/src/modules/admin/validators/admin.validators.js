import { z } from "zod";
/**
 * validation
 */
const objectIdSchema = z.string().length(24, {
  message: "Must be a 24-character hex string",
});

/**
 * Admin query schema
 * Used for:
 * filtering data
 * pagination
 * stats
 */
export const adminQuerySchema = z.object({
  query: z.object({
    seriesId: objectIdSchema.optional(), // Optional series ID
    days: z.coerce.number().min(1).max(365).optional(), // Last X days filter
    limit: z.coerce.number().min(1).max(100).optional(), // Pagination limit
  }),
});

/**
 * Dashboard query
 * includeStats=true
 * => detailed stats
 */
export const dashboardQuerySchema = z.object({
  query: z.object({
    includeStats: z
      .preprocess((val) => val === "true" || val === true, z.boolean())
      .optional(),
  }),
});
