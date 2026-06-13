import dotenv from "dotenv";
import {z} from "zod";
import appConstant from "../constant/app.constant.js";
dotenv.config();
// creating zod object to validate env Schema
const envSchema = z.object({
    PORT: z.coerce.number().default(appConstant.PORT),
    MONGO_URI: z.string().default(appConstant.MONGO_URI),
    NODE_ENV: z.string().default(appConstant.NODE_ENV),
    LOGGER_LEVEL: z.string().default(appConstant.LOGGER_LEVEL),
    MORGAN_LOGGER : z.string().default(appConstant.MORGAN_LOGGER),
    RATELIMIT_WINDOWMS: z.coerce.number().default(appConstant.RATELIMIT_WINDOWMS),
    RATELIMIT_MAX: z.coerce.number().default(appConstant.RATELIMIT_MAX),
    CORS_ORIGIN: z.string().default(appConstant.CORS_ORIGIN),
    DATA_LIMIT: z.string().default(appConstant.DATA_LIMIT)
})

// parsing env for correct format
const parsed = envSchema.safeParse(process.env);

if(!parsed.success){
    console.error(parsed.error.format());
}
export default parsed.data;
