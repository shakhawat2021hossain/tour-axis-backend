import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        success: false,
        message: `something went wrong ${error.message}`,
        error,
        stack: envVars.NODE_ENV === "development" ? error.stack : null
    })

}