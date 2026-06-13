import dotenv from "dotenv";
import {z} from "zod";
import appConstant from "../constant/app.constant.js";
dotenv.config();

// creating zod object to validate env Schema
const envSchema = z.object({
    PORT: z.coerce.number().default(appConstant.PORT),
    MONGO_URI: z.string().default(appConstant.MONGO_URI),
    NODE_ENV: z.string().default(appConstant.NODE_ENV),
    LOGGER_LEVEL: z.string().default(appConstant.LOGGER_LEVEL)
})

// parsing env for correct format
const parsed = envSchema.safeParse(process.env);


if(!parsed.success){
    logger.error(parsed.error.format());
}
export default parsed.data;
