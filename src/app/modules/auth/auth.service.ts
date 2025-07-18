import AppError from "../../erroHelpers/AppError";
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import httpStatus from "http-status-codes"
import bcrypt from "bcryptjs"


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

    return { email: isExist.email }

}


export const authServices = {
    credentialLogin
}