import AppError from "../../erroHelpers/AppError";
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import httpStatus from "http-status-codes"
import bcrypt from "bcryptjs";
import { accessTokenWithRefreshToken, userTokens } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";


const credentialLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isExist = await User.findOne({ email })
    if (!isExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist!")
    }

    const isMatched = await bcrypt.compare(password as string, isExist.password as string)
    if (!isMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Icorrect password!")
    }

    const tokens = await userTokens(isExist)

    const user =  isExist.toObject();

    delete user.password

    return { 
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
    }

}

const getNewAccessToken = async (refreshToken: string) => {
    
   const accessToken = await accessTokenWithRefreshToken(refreshToken)

    return { 
        accessToken
    }

}

const resetPass = async(oldPass: string, newPass: string, decodedToken: JwtPayload) =>{
    console.log(decodedToken);
    const user =  await User.findById(decodedToken.userId)
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, "User not found!")
    }
    
    const isMatched = await bcrypt.compare(oldPass, user?.password as string)
    if(!isMatched){
        throw new AppError(httpStatus.UNAUTHORIZED, "Password didnot matched")
    }

    const hashedPass = await bcrypt.hash(newPass, 10) as string

    user.password = hashedPass;

    user.save()

}

export const authServices = {
    credentialLogin,
    getNewAccessToken,
    resetPass
}