import { NextFunction, Request, Response } from "express";
import AppError from "../erroHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(403, "No access token found!")
        }

        const isVerified = verifyToken(token, envVars.JWT_SECRET);
        if (!authRoles.includes(isVerified.role)) {
            throw new AppError(403, "You are not permitted for accessing the route!")
        }
        // req.user = isVerified
        next()
    }
    catch (error) {
        console.log(error);
        next(error)
    }

}