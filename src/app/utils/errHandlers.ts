/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorResponse, TErrorSrc } from "../interface/error.types";

export const duplicateErr = (error: any): TErrorResponse => {
    const statusCode = 400;
    const matchedArr = error.message.match(/"([^"]*)"/)
    const message = `${matchedArr[1]} already exists`
    return {
        message,
        statusCode
    }
}
export const castErr = (): TErrorResponse => {
    return {
        message: "invalid mongodb object id, provide a valid id",
        statusCode: 400
    }
}

export const validationErr = (error: any): TErrorResponse => {
    const errorSources: TErrorSrc[] = []
    const errors = Object.values(error.errors)
    // console.log(errors);
    errors.forEach((err: any) => errorSources.push(
        {
            path: err.path,
            message: err.message
        })
    )
    return {
        message: "Validation error!",
        statusCode: 400,
        errorSources
    }
}
export const zodErr = (error: any): TErrorResponse => {
    const errorSources: TErrorSrc[] = []
    const errors = error.issues
    errors.forEach((errObj: any) => errorSources.push({
        path: errObj.path[0],
        message: errObj.message
    }))
    return {
        message: "ZOD Error",
        statusCode: 400,
        errorSources
    }
}