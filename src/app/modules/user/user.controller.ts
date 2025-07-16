import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { userServices } from "./user.service";
// import AppError from "../../erroHelpers/AppError";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // throw new Error("user ctrlr error")
        // throw new AppError(httpStatus.BAD_REQUEST, "user ctrlr error")
        const user = await userServices.createUser(req.body)
        // console.log(req.body);
        res.status(httpStatus.CREATED).json({
            message: "New user created",
            user
        })
    }
    catch (error) {
        // console.log(error);
        next(error)
        
    }
}

export const userControllers = { createUser }