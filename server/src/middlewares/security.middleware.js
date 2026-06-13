import rateLimit from "express-rate-limit";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import express from "express";

export default function securityMiddleware(app){
    // adding security headers
    app.use(helmet());

    // http parameter pollution check
    app.use(hpp());

    // rate limiter added to ensure maximum 100 requests per 15 minutes per ip address
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        legacyHeaders: true,
        message: "Too many requests try again after few minutes."
    }))

    // parsing req.body
    app.use(express.json({limit: "5mb"})); // limiting req.body to max 5mb
    app.use(express.urlencoded({extended: true, limit: "3mb"})) // limitng html form data to max 10mb

    // adding compression middleware to reduce the size of the response bodies
    app.use(compression());

}