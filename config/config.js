import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()



let DB_URI = process.env.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Nickey:Nickey@cluster0.i0gut.mongodb.net/Towgig?retryWrites=true&w=majority)
        console.log("Database connected...")
    } catch (error) {
        console.log("something went wrong....", error)
    }
}

export default connectDB
