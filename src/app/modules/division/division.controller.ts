import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { divisionServices } from "./division.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"

const createDivision = catchAsync(async(req: Request, res: Response) =>{
    const division = await divisionServices.createDivision(req.body)
    sendResponse(res, {
        success: true,
        data: division,
        message: "Created new division",
        statusCode: httpStatus.CREATED,
    })
})

export const divisionControllers = {
    createDivision
}