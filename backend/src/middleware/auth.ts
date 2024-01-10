import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

declare global {
    namespace Express {
        interface  Request {
            userId: string
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    //Get authToken FROM THE COOKIE
    const token =  req.cookies["authToken"];

    if(!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
        //Get userId from the decode token
        req.userId = (decode as JwtPayload).userId;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized"});
    }
}

export default verifyToken;