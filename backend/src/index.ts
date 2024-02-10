import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import myHotelRoutes from "./routes/myHotelsRoutes";
import hotelsRoutes from "./routes/hotelsRoutes"; 
import bookingRoutes from "./routes/myBookingsRoutes"
import path from "path";
import { v2 as cloudinary } from 'cloudinary';

//starts connection to cloudinary from here
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json()); //converts the body of api request into json response
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotel", hotelsRoutes);
app.use("/api/my-bookings", bookingRoutes);

//to pass on any request to our url that are not url endpoint 
app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
}) 


app.listen(4000, () => {
    console.log("I'm running localhost:4000")
})