import AppError from "../../erroHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";

const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload

    const isExist = await User.findOne({ email })
    if (isExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Already exist!")
    }

    const hashedPass = await bcrypt.hash(password as string, 10)

    const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string }

    const user = await User.create({ email, password: hashedPass, auths: [authProvider], ...rest })
    return user
}

const getAllUser = async () => {
    const users = await User.find({})
    return users;
}

export const userServices = {
    createUser, getAllUser
}