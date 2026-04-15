import express from "express";
import dotenv from "dotenv";
import router from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();    

const app = express();

app.use(cookieParser())

app.use(express.json());

app.use("/auth",router);

app.get("/",(req, res)=>{
    res.send("Hello World");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

