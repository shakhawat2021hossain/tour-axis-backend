import { JwtPayload } from "jsonwebtoken"
import { generateToken, verifyToken } from "./jwt"
import { envVars } from "../config/env"
import AppError from "../erroHelpers/AppError"
import { User } from "../modules/user/user.model"
import httpStatus from "http-status-codes"
import { IsActive } from "../modules/user/user.interface"

export const userTokens = async (user: JwtPayload) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    }
    console.log(jwtPayload);

    const accessToken = generateToken(jwtPayload, envVars.JWT_SECRET, "1d")
    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_TOKEN_SECRET, "30d")

    return {
        accessToken,
        refreshToken
    }

}

export const accessTokenWithRefreshToken =  async (refreshToken: string) =>{
    const isVerified = verifyToken(refreshToken, envVars.JWT_REFRESH_TOKEN_SECRET)
    

    const isExist = await User.findOne({ email: isVerified.email })
    if (!isExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist!")
    }

    if(isExist.isDeleted){
        throw new AppError(httpStatus.BAD_REQUEST, "User is deleted")
    }

    if(isExist.isActive === IsActive.BLOCKED || isExist.isActive === IsActive.INACTIVE){
        throw new AppError(httpStatus.BAD_REQUEST, "User is blocked or inactive")
    }


    const jwtPayload = {
        userId: isExist._id,
        email: isExist.email,
        role: isExist.role
    }
    const accessToken = generateToken(jwtPayload, envVars.JWT_SECRET, "1d")
    
    return accessToken
}