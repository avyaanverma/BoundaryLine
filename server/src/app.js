import express from "express";
import env from "./config/env.js"
import morgan from "morgan";
import securityMiddleware from "./middlewares/security.middleware.js";

export default function createApp(){
    const app = express();

    // this code will only work in production
    if(env.NODE_ENV === "development"){
        app.use(morgan(env.MORGAN_LOGGER));
    }

    securityMiddleware(app); // security middleware added 

    // app.use(pass)
    
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