import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { authServices } from "./auth.service"
import httpStatus from "http-status-codes"
import AppError from "../../erroHelpers/AppError"
import { setCookies } from "../../utils/setCookies"
import { JwtPayload } from "jsonwebtoken"
import { userTokens } from "../../utils/userTokens"
import passport from "passport"

/*
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

*/

// using passport local
const credentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    passport.authenticate("local", async (err: any, user: any, info: any) => {

        // console.log(user, err, info);
        if(err){
            return next(new AppError(httpStatus.BAD_REQUEST, err))
        }

        // if not user, not matched pass, auths handling way
        if(!user){
            return next(new AppError(httpStatus.BAD_REQUEST, info.message))
        }
        
        const tokens = await userTokens(user)
        setCookies(res, tokens)
        
        if(user.password){
            delete user.toObject().password;
        }


        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            data: {
                tokens,
                user
            },
            message: "Successfully user logged in"
        })
    })(req, res, next)



})


const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {

    const { refreshToken } = req.cookies;
    if (!refreshToken) {
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

const logOut = catchAsync(async (req: Request, res: Response) => {
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


const resetPass = catchAsync(async (req: Request, res: Response) => {
    const { oldPass, newPass } = req.body
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

const googleCallback = catchAsync(async (req: Request, res: Response) => {
    const redirectTo = (req.query.state as string) || '/'
    const cleanRedirectTo = redirectTo.startsWith('/') ? redirectTo.slice(1) : redirectTo;

    const user = req.user;
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
    }

    const tokens = await userTokens(user)
    setCookies(res, tokens)
    res.redirect(`http://localhost:5174/${cleanRedirectTo}`)
})

export const authControllers = {
    credentialLogin,
    getNewAccessToken,
    logOut,
    resetPass,
    googleCallback
}