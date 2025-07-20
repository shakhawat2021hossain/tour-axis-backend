import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { authServices } from "./auth.service"
import httpStatus from "http-status-codes"
import AppError from "../../erroHelpers/AppError"
import { setCookies } from "../../utils/setCookies"
import { JwtPayload } from "jsonwebtoken"

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

const logOut = catchAsync(async(req: Request, res: Response) =>{
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: null,
        message: "Logout successfully!"
    })
})


const resetPass = catchAsync(async(req: Request, res: Response) =>{
    const {oldPass, newPass} = req.body
    const decodedToken = req.user as JwtPayload
    console.log(decodedToken);
    await authServices.resetPass(oldPass, newPass, decodedToken)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: null,
        message: "Password changed successfully!"
    })
})

export const authControllers = {
    credentialLogin,
    getNewAccessToken,
    logOut,
    resetPass
}