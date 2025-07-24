/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import AppError from "../erroHelpers/AppError"
import { TErrorSrc } from "../interface/error.types"
import { castErr, duplicateErr, validationErr, zodErr } from "../utils/errHandlers"


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let message = "Something went wrong"
    let statusCode = 500
    let errorSources: TErrorSrc[] = []

    // 1. mongoose duplicate error
    if (error.code === 11000) {
        const handle = duplicateErr(error)
        statusCode = handle.statusCode
        message = handle.message
    }

    // 2. mongoose invalid cast/object id error
    else if (error.name === "castError") {
        const handle = castErr()
        statusCode = handle.statusCode
        message = handle.message
    }
    // 3. mongoose validation error
    else if (error.name === "ValidationError") {
        const handle = validationErr(error)
        statusCode = handle.statusCode
        message = handle.message
        errorSources = handle.errorSources as TErrorSrc[]

    }


    // ZOD Error Handling
    else if (error.name === "ZodError") {
        const handle = zodErr(error)
        statusCode = handle.statusCode
        message = handle.message
        errorSources = handle.errorSources as TErrorSrc[]
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
        errorSources,
        error,
        stack: envVars.NODE_ENV === "development" ? error.stack : null
    })

}