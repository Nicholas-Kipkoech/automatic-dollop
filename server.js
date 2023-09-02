import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/config.js";
import buyerRouter from "./routes/buyer/buyer.route.js";
import expertRouter from "./routes/expert/expert.route.js";

dotenv.config();
const server = express();

//connect db
connectDB();
server.use(express.json());

//api endpoints
server.get("/",(req,res)=>{
  return "Hello server is running"
})
server.use("/api/v1/auth/buyer", buyerRouter);
server.use("/api/v1/auth/expert", expertRouter);

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`server started on port  ${port}`));
