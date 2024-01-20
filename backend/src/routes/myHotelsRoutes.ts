import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/Hotel";
import verifyToken from "../middleware/auth";
import { body, check, validationResult } from "express-validator";
import { HotelType } from "../shared/types";

const router = express.Router();

const storage = multer.memoryStorage();
//store any images we get from the post request in memory cos we are going to upload them to cloudinary as soon as we get them
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5MB
    }
})

//Creating a hotel
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
        const imagesUrl = await newFunction(imagesFiles); //wait for images to be uploaded before we ge back a string array
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

//fetching a hotel by userId
router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({ userId: req.userId });
        res.json(hotels)

    } catch (err) {
        res.status(500).json({ message: 'server error' })
    }
})


//get a post
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
    const id = req.params.id.toString();
    try {
        const singleHotel = await Hotel.findOne({
            _id: id,
            userId: req.userId
        });
        res.json(singleHotel);
    } catch (err) {
        res.status(500).json({ message: 'server error' })
    }
})

//update a hotel 
router.put("/:hotelId", verifyToken,
    upload.array("imageFiles"),
    async (req: Request, res: Response) => {
        try {
            const updatedHotel: HotelType = req.body; //getting the details of the request
            updatedHotel.lastUpdated = new Date();
            const update = await Hotel.findOneAndUpdate({
                _id: req.params.hotelId,
                userId: req.userId
            }, updatedHotel, { new: true })

            //if the _id didnt match
            if(!update) {
                return res.status(404).json({ message: "Hotel Not Found" })
            }

            //taking new files from the request
            const newFiles = req.files as Express.Multer.File[];
            //upload the images to cloudinary
            const updatedImages = await newFunction(newFiles);
            
            update.imageUrls = [...updatedImages, ...(updatedHotel.imageUrls || [])] //cos we are storing as a array

            await update.save()

            res.status(201).send(update)
        } catch (err) {
            res.status(500).json({ message: "Server Error" })
        }
})


async function newFunction(imagesFiles: Express.Multer.File[]) {
    const uploadPromises = imagesFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        //type of images we are getting
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        //upload image to cloudinary
        const res = await cloudinary.v2.uploader.upload(dataURI);
        //getting the url of the hosted image in cloudinary
        return res.url;
    });

    const imagesUrl = await Promise.all(uploadPromises); //wait for images to be uploaded before we ge back a string array
    return imagesUrl;
}

export default router;
