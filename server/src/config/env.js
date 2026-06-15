import dotenv from "dotenv";
import { z } from "zod";
import appConstant from "../constant/app.constant.js";
dotenv.config();

// creating zod object to validate env Schema
const envSchema = z.object({
  PORT: z.coerce.number().default(appConstant.PORT),
  MONGO_URI: z.string().default(appConstant.MONGO_URI),
  NODE_ENV: z.string().default(appConstant.NODE_ENV),

  // Loggers
  LOGGER_LEVEL: z.string().default(appConstant.LOGGER_LEVEL),
  MORGAN_LOGGER: z.string().trim().default(appConstant.MORGAN_LOGGER),

  // CORS origins
  CORS_ORIGIN: z.string().trim().default(appConstant.CORS_ORIGIN),

  // Rate limitation
  RATELIMIT_WINDOWMS: z.coerce.number().default(appConstant.RATELIMIT_WINDOWMS),
  RATELIMIT_MAX: z.coerce.number().default(appConstant.RATELIMIT_MAX),
  DATA_LIMIT: z.string().default(appConstant.DATA_LIMIT),

  // Google OAuth Credentials
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string(),

  // Redirect url
  REDIRECT_URL: z.string(),

  // Token Secrets
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
});

// parsing env for correct format
const parsed = envSchema.safeParse(process.env);

if(!parsed.success){
    console.error(parsed.error.format());
    process.exit(1);
}

export default parsed.data;
