import rateLimit from "express-rate-limit";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import express from "express";
import env from "../config/env.js"

export default function securityMiddleware(app){
    // adding cors middleware
    app.use(cors({
        origin: env.CORS_ORIGIN.split(",").map((origin)=> origin.trim()),
        credentials: true
    }));

    // adding security headers
    app.use(helmet());
    
    // http parameter pollution check
    app.use(hpp());

    // rate limiter added to ensure maximum 100 requests per 15 minutes per ip address
    app.use(rateLimit({
        windowMs: env.RATELIMIT_WINDOWMS,
        max: env.RATELIMIT_MAX,
        legacyHeaders: true,
        message: "Too many requests try again after few minutes."
    }))

    // parsing req.body
    app.use(express.json({limit: env.DATA_LIMIT})); // limiting req.body to max 5mb
    app.use(express.urlencoded({extended: true, limit: env.DATA_LIMIT})) // limiting html form data to max 5mb

    // adding compression middleware to reduce the size of the response bodies
    app.use(compression());

}