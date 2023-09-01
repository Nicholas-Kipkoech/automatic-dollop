import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let DB_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connected...");
  } catch (error) {
    console.log("something went wrong....", error);
  }
};

export default connectDB;
