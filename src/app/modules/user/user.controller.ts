import { Request, Response } from "express";
import httpStatus from "http-status-codes"
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken"
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

const updateUser = catchAsync(async (req: Request, res: Response) => {
    // const token = req.headers.token
    // const decodedToken = jwt.verify(token as string, envVars.JWT_SECRET)
    const result = await userServices.updateUser(req.params.id, req.body, req.user as JwtPayload)
    
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

export const userControllers = { createUser, updateUser, getAllUser }


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
