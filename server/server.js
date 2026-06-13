import createApp from "./src/app.js";


function startServer(){
    const app = createApp();
    
    app.listen(3000, ()=>{
        console.log("Server listening on http://localhost:3000");
    });
}

startServer();