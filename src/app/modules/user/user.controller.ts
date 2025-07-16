import { Request, Response } from "express";
import httpStatus from "http-status-codes"
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
// import AppError from "../../erroHelpers/AppError";



const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.createUser(req.body)
    
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        data: result,
        message: "Successfully crreated a new user"
    })
})

const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.getAllUser()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "All users are retrieved"
    })
})

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         // throw new Error("user ctrlr error")
//         // throw new AppError(httpStatus.BAD_REQUEST, "user ctrlr error")
//         const user = await userServices.createUser(req.body)
//         // console.log(req.body);
//         res.status(httpStatus.CREATED).json({
//             message: "New user created",
//             user
//         })
//     }
//     catch (error) {
//         // console.log(error);
//         next(error)

//     }
// }

// const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const users = await userServices.getAllUser()
//         console.log(users);
//         res.status(httpStatus.OK).json({
//             message: "All users are retrieved",
//             users
//         })
//     }
//     catch (error) {
//         // console.log(error);
//         next(error)

//     }
// }

export const userControllers = { createUser, getAllUser }