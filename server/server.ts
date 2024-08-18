import app from "./app";
import http from "http";
import dot_env from "dotenv";
import mongoose from "mongoose";

dot_env.config();
const MONGO_URI: string = process.env.MONGO_URI !;

const PORT = 8000;
const server = http.createServer(app);

async function startServer(){
    mongoose.connection.once('open',()=>{
        console.log("MongoDB is connected");
    })
    mongoose.connection.on('error',(err)=>{
        console.log(err);
    })
    try{
       await mongoose.connect(MONGO_URI)
    server.listen(PORT, () => {
        console.log(`Server is running on port:${PORT}`);
    });
    }
    catch(err){
        console.error(err)
    }
}
startServer();


