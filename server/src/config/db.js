import mongoose from "mongoose";
import env from "./env.js";

export default async function connectDB() {
    // What: connect to MongoDB using the validated application URI.
    // Why: API routes should fail at startup if the database cannot be reached.
    // How: disable command buffering and use a bounded server-selection timeout.
    mongoose.set("bufferCommands", false);
    await mongoose.connect(env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
    });
}

