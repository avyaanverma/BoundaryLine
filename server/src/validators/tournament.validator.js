import { z } from "zod";
import mongoose from "mongoose";

import { FORMAT } from "../constant/format.constant.js";
import { TOURNAMENT_STATUS } from "../constant/series.constant.js";

const objectIdSchema = z.string().refine(
    (value) => mongoose.Types.ObjectId.isValid(value),
    {
        message: "Invalid ObjectId"
    }
);

export const createTournamentSchema = {
    body: z.object({
        name: z
            .string()
            .trim()
            .min(3)
            .max(100),

        format: z
            .enum(Object.values(FORMAT))
            .optional(),

        startDate: z.coerce.date(),

        endDate: z.coerce.date(),

        status: z
            .enum(Object.values(TOURNAMENT_STATUS))
            .optional(),

        teams: z
            .array(objectIdSchema)
            .optional()
            .default([]),

        winnerTeam: objectIdSchema
            .nullable()
            .optional()
    }).refine(
        (data) => data.endDate >= data.startDate,
        {
            message: "End date must be after start date",
            path: ["endDate"]
        }
    )
};

export const updateTournamentSchema = {
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
            .enum(Object.values(TOURNAMENT_STATUS))
            .optional(),

        teams: z
            .array(objectIdSchema)
            .optional(),

        winnerTeam: objectIdSchema
            .nullable()
            .optional()
    })
};

export const tournamentIdSchema = {
    params: z.object({
        id: objectIdSchema
    })
};
