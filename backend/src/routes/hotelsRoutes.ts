import express, { Request, Response } from "express";
import Hotel from "../models/Hotel";
import { BookingType, HotelSearchResponse, HotelType, PaymentIntentResponse } from "../shared/types";
import { param, validationResult } from "express-validator";
import Stripe from "stripe";
import verifyToken from "../middleware/auth";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string)

const router = express.Router();


router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query) //check below to see the function

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 } //high to low
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 } //low to high
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 } //high to low
        break;
    }


    //Basically, to get all the hotels we have in the db and return to the user
    //This is what the user will see when they navigate to the search page
    const pageSize = 5; //number of hotels the frontend gets per request
    const pageNumber = parseInt
      (req.query.page ? req.query.page.toString() : "1") //query parameters are always string so we need to convert them

    //eg pageNumber = 3 , skip = 10 so it skips the first 10 items it finds. 
    //So since each holds 5, the first 2 pages that holds 10 get skipped
    const skip = (pageNumber - 1) * pageSize; //how many items(pages) we want to skip

    const hotels = await Hotel.find(query).sort(sortOptions).skip(skip).limit(pageSize);
    // Hotel.find() finds all the hotels
    //limit becos we dont want to get every single page after that 
    //it displays only 5

    const total = await Hotel.countDocuments(query);//gives us a total count of all the documents in our db
    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize)
      }
    }

    res.json(response)

  } catch (err) {
    console.log("error", err);
    res.status(500).json({ message: "Server Error" })
  }
})


router.get("/:id", [
  param("id").notEmpty().withMessage("Hotel Id is required")
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const id = req.params.id.toString()

  try {
    const hotel = await Hotel.findById(id)

    res.json(hotel)

  } catch (err) {
    console.log("error", err);
    res.status(500).json({ message: "Server Error" })
  }
})

router.post("/:hotelId/bookings/payment-intent", verifyToken, async (req: Request, res: Response) => {
  //To create payment intent:
  //1.Total Cost
  //2.hotelId
  //3.userId

  const { nightsToSpend } = req.body; //getting the number of nights
  const hotelId = req.params.hotelId;

  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    return res.status(400).json({ message: "No Hotel Found" })
  }

  const totalAmount = hotel.pricePerNight * nightsToSpend;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100,
    currency: "gbp",
    metadata: { //stores additional stuffs against the payment intent
      hotelId,
      userId: req.userId //also helps to check if a booking has been paid for been saving the the db
    }
  })

  //A client secret is something we need to return to the frontend so 
  //that the user can create a card payment against this payment intent
  if (!paymentIntent.client_secret) {
    return res.status(500).json({ message: "Error in creating payment intent" })
  }

  //what to send back to frontend
  const response: PaymentIntentResponse = {
    paymentIntentId: paymentIntent.id, //initialize some stripe elements on the frontend
    clientSecret: paymentIntent.client_secret.toString(), //this will be used by StripeElements to make a card element that users can put their cards into with this id 
    totalAmount
  }

  res.send(response);

})

router.post("/:hotelId/bookings", verifyToken, async (req: Request, res: Response) => {
  try {
    //check if stripe payment was successful 
    // check if booking has been paid
    //Use the paymentIntentId that will be sent to us by the frontend
    //Payment IntentId is basically the id for the booking
    const paymentIntentId = req.body.paymentIntentId;

    //Getting the invoice for this booking
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    )

    if (!paymentIntent) {
      return res.status(400).json({ message: "Payment Intent Not Found" })
    }

    //check whether the hotelId and userId stored in the paymentIntent matches what we get from the request
    if (paymentIntent.metadata.hotelId !== req.params.hotelId || 
      paymentIntent.metadata.userId !== req.userId) {
        return res.status(400).json({ message: "Payment Intent Mismatch" });
    }

    if(paymentIntent.status !== 'succeeded') {
      return res.status(400)
      .json({ message: `payemnt intent not succeded. Status: ${paymentIntent.status}`})
    }

    const newBooking: BookingType = {
      ...req.body,
      userId: req.userId
    }

    //get the hotel and update it
    const hotel = await Hotel.findOneAndUpdate({
      _id: req.params.hotelId
    }, {
      $push: { bookings: newBooking }
    })

    if(!hotel) {
      return res.status(400).json({ message: "Hotel Not Found" })
    }

    await hotel.save()
    res.status(200).send()

  } catch (err) {
    console.log("error", err);
    res.status(500).json({ message: "Server Error" })
  }
})

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") }, //performs a case-insensitive match
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities) //we want to get all hence the $all filter in mongoose
        ? queryParams.facilities  //receive it as a string or an array of strings
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = { //returns any of the hotels that have the type in the type property
      $in: Array.isArray(queryParams.types) //$in because a hotel can only have 1 type
        ? queryParams.types
        : [queryParams.types], //return any of the hotels that have the type in the query
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

export default router;