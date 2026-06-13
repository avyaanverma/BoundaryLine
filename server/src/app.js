import express from "express";
import env from "./config/env.js"
import morgan from "morgan";
import securityMiddleware from "./middlewares/security.middleware.js";

export default function createApp(){
    const app = express();

    if(env.NODE_ENV === "production"){
        app.use(morgan("dev"));
    }

    securityMiddleware(app); // security middleware added 

    /**
     * @method GET
     * @route /health
     * @description to check the status of the server
     * */ 
    app.get("/health", (req,res)=>{
        res.json({
            message: "healthy"
        })
    })

    return app;
};