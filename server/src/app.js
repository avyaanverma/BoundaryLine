import express from "express";
import env from "./config/env.js"
import morgan from "morgan";
import rateLimit from "express-rate-limit";

export default function createApp(){
    const app = express();

    if(env.NODE_ENV === "production"){
        app.use(morgan("dev"));
    }

    // rate limiter added to ensure maximum 100 requests per 15 minutes per ip address
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        legacyHeaders: true,
        message: "Too many requests try again after few minutes."
    }))

    // parsing req.body
    app.use(express.json({limit: "3mb"})); // limiting req.body to max 10mb
    app.use(express.urlencoded({extended: true, limit: "3mb"})) // limitng html form data to max 10mb

    app.get("/health", (req,res)=>{
        res.json({
            message: "healthy"
        })
    })

    return app;
};