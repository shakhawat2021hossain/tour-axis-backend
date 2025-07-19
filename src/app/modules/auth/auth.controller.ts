import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { authServices } from "./auth.service"
import httpStatus from "http-status-codes"
import AppError from "../../erroHelpers/AppError"
import { setCookies } from "../../utils/setCookies"

const credentialLogin = catchAsync(async (req: Request, res: Response) => {

    const result = await authServices.credentialLogin(req.body)
    
    setCookies(res, result)


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Successfully user logged in"
    })
})


const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {

    const {refreshToken} = req.cookies;
    if(!refreshToken){
        throw new AppError(httpStatus.NOT_FOUND, "No refresh token found")
    }
    const result = await authServices.getNewAccessToken(refreshToken)

    // res.cookie("accessToken", result.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })
    setCookies(res, result)


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "New access token is generated"
    })
})

export const authControllers = {
    credentialLogin,
    getNewAccessToken
}