import createApp from "./src/app.js";
import connectDB from "./src/config/db.js";
import env from "./src/config/env.js";

function startServer(){
    const app = createApp();
    connectDB().then(()=>{
        console.log("database connected.")
        app.listen(env.PORT, ()=>{
            console.log(`Server listening on http://localhost:${env.PORT}`);
        });
    }).catch((err)=>{
        console.log("Error in connecting database : ", err)
    })
}

startServer();