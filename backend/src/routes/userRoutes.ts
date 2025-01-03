import express, { Request, Response } from "express"
import User from "../models/User";
import jwt from 'jsonwebtoken'
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/register", [
    // Validate user input
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6, }),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() })
    }
    try {
        let user = await User.findOne({
            email: req.body.email
        })

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        user = new User(req.body);
        await user.save();

        //This function is typically used to generate a JWT by signing a payload 
        //with a secret key or a private key.
        const token = jwt.sign({
            userId: user._id //helps us dentify who the user is that is trying to make a given request. Store it in the token
        }, process.env.JWT_SECRET_KEY as string, { //This is the jwt secret key used to encrypt the token
            expiresIn: "1d"
        })

        //In summary, this code generates a JWT containing the user's userId, 
        //signs it using the secret key stored in the JWT_SECRET_KEY environment 
        //variable, and sets an expiration time of one day ("1d").

        res.cookie("authToken", token, {
            httpOnly: true, //can only be accessed on the server
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        })

        return res.status(200).send({ message: "User sucessfully registered " });


    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" })

    }
})


router.get("/me", verifyToken, async (req: Request, res: Response) => {
    const userId = req.userId; //taking the id from the cookie

    try {
        const user = await User.findById(userId).select("-password") //selects everything but the pasword
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" })
    }
})


export default router;