import AppError from "../../erroHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";

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

const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {
    const isExist = await User.findById(userId)
    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "No user found!")
    }

    if (payload.role) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized to update role")
        }
        if (decodedToken.role === Role.ADMIN && payload.role === Role.SUPER_ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
        }
    }

    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }
    }

    if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, 10)
    }

    const updatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

    return updatedUser

}

const getAllUser = async () => {
    const users = await User.find({})
    return users;
}

export const userServices = {
    createUser, getAllUser, updateUser
}