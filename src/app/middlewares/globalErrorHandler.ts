import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import AppError from "../erroHelpers/AppError"

interface TError {
    path: string,
    message: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let message = "Something went wrong"
    let statusCode = 500
    const erroSources: TError[] = []
    // 1. mongoose duplicate error
    if (error.code === 11000) {
        statusCode = 400;
        const matchedArr = error.message.match(/"([^"]*)"/)
        message = `${matchedArr[1]} already exists`
    }

    // 2. mongoose invalid cast/object id error
    else if (error.name === "castError") {
        statusCode = 400
        message = "invalid mongodb object id, provide a valid id"
    }
    // 3. mongoose validation error
    else if (error.name === "ValidationError") {
        statusCode = 400
        message = "Validation error!"
        const errors = Object.values(error.errors)
        // console.log(errors);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        errors.forEach((err: any) => erroSources.push(
            {
                path: err.path,
                message: err.message

            })
        )
    }

    // when use AppError to show error
    else if (error instanceof AppError) {
        statusCode = error.statusCode
        message = error.message
    }

    // when use Error to show error
    else if (error instanceof Error) {
        statusCode = 500;
        message = error.message
    }

    res.status(statusCode).json({
        success: false,
        message,
        erroSources,
        error,
        stack: envVars.NODE_ENV === "development" ? error.stack : null
    })

}