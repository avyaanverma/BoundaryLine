import express from "express";
import env from "./config/env.js"
import morgan from "morgan";

export default function createApp(){
    const app = express();

    if(env.NODE_ENV === "production"){
        app.use(morgan("dev"));
    }

    app.get("/health", (req,res)=>{
        res.json({
            message: "healthy"
        })
    })

    return app;
};