import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/Hotel";
import verifyToken from "../middleware/auth";
import { body, check, validationResult } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
//store any images we get from the post request in memory cos we are going to upload them to cloudinary as soon as we get them
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5MB
    }
})

router.post("/", verifyToken, [
    body("name").notEmpty().withMessage('Name is required'),
    body("country").notEmpty().withMessage('Country is required'),
    body("city").notEmpty().withMessage('City is required'),
    body("description").notEmpty().withMessage('Description is required'),
    body("type").notEmpty().withMessage('Hotel Type is required'),
    body("pricePerNight")
    .notEmpty().isNumeric()
    .withMessage('Price Per Night is required and must be number'),
    body("facilities").notEmpty().isArray().withMessage('Facilities are required'),
], upload.array("imageFiles", 6), async (req: Request, res: Response) => {

    try {
        const imagesFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;   

        //upload images to cloundinary
        const uploadPromises = imagesFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            //type of images we are getting
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            //upload image to cloudinary
            const res = await cloudinary.v2.uploader.upload(dataURI);
            //getting the url of the hosted image in cloudinary
            return res.url;
        })

        const imagesUrl = await Promise.all(uploadPromises); //wait for images to be uploaded before we ge back a string array
        //add the url to the hotels if the upload was successful
        newHotel.imageUrls = imagesUrl;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        //save to db
        const hotel = new Hotel(newHotel);
        await hotel.save();

        return res.status(201).send(hotel);


    } catch (err) {
        console.log("Error creating hotel: ", err);
        res.status(500).json({ message: "Server Error" });
    }
});


export default router;