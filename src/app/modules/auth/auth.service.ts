import AppError from "../../erroHelpers/AppError";
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import httpStatus from "http-status-codes"
import bcrypt from "bcryptjs";
import { accessTokenWithRefreshToken, userTokens } from "../../utils/userTokens";


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

    const jwtPayload = {
        userId: isExist._id,
        email: isExist.email,
        role: isExist.role
    }

    const tokens = await userTokens(jwtPayload)

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


export const authServices = {
    credentialLogin,
    getNewAccessToken
}