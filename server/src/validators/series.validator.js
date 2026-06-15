import mongoose from "mongoose";
import { z } from "zod";

import { FORMAT } from "../../../constant/format.constant.js";
import { SERIES_STATUS } from "../../../constant/series.constant.js";

const objectIdSchema = z.string().refine(
  (value) => mongoose.Types.ObjectId.isValid(value),
  {
    message: "Invalid ObjectId",
  }
);

export const createSeriesSchema = {
  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(3, "Series name must be at least 3 characters")
        .max(100),

      format: z
        .enum(Object.values(FORMAT))
        .optional(),

      startDate: z.coerce.date(),

      endDate: z.coerce.date(),

      status: z
        .enum(Object.values(SERIES_STATUS))
        .optional(),

      teams: z
        .array(objectIdSchema)
        .min(2, "Series must have at least 2 teams"),

      winnerTeam: objectIdSchema
        .nullable()
        .optional(),
    })
    .refine(
      (data) => data.endDate >= data.startDate,
      {
        path: ["endDate"],
        message:
          "End date must be after start date",
      }
    ),
};


export const updateSeriesSchema = {
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3)
      .max(100)
      .optional(),

    format: z
      .enum(Object.values(FORMAT))
      .optional(),

    startDate: z
      .coerce
      .date()
      .optional(),

    endDate: z
      .coerce
      .date()
      .optional(),

    status: z
      .enum(Object.values(SERIES_STATUS))
      .optional(),

    teams: z
      .array(objectIdSchema)
      .min(2)
      .optional(),

    winnerTeam: objectIdSchema
      .nullable()
      .optional(),
  }),
};


export const seriesIdSchema = {
  params: z.object({
    id: objectIdSchema,
  }),
};

