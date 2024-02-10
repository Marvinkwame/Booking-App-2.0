import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/Hotel";
import { HotelType } from "../shared/types";


const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({
            bookings: { $elemMatch: { userId: req.userId } }
        })
        //NB:Returns the hotel and the entire bookings array

        const results = hotels.map((hotel) => {
            const userBookings = hotel.bookings.filter(
                (booking) => booking.userId === req.userId
            ) //Returns the booking object where booking.userId is equal to the user making the request from the frontend

            const hotelWithBookings: HotelType = { //returningthe hotelswhich the user has booking with their other properties
                ...hotel.toObject(),// converts the mongodb documents to JavaScript objects
                bookings: userBookings,
            }

            return hotelWithBookings
        })

        res.status(200).send(results);

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Unable to fetch bookings" })
    }
})


export default router;