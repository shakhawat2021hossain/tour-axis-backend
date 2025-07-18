import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { authServices } from "./auth.service"
import httpStatus from "http-status-codes"

const credentialLogin = catchAsync(async (req: Request, res: Response) => {

    const result = await authServices.credentialLogin(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Successfully user logged in"
    })
})

export const authControllers = {
    credentialLogin
}