import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { divisionServices } from "./division.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"

const createDivision = catchAsync(async (req: Request, res: Response) => {
    const division = await divisionServices.createDivision(req.body)
    sendResponse(res, {
        success: true,
        data: division,
        message: "Created new division",
        statusCode: httpStatus.CREATED,
    })
})

const getAllDivision = catchAsync(async (req: Request, res: Response) => {
    const divisions = await divisionServices.getAllDivision()
    sendResponse(res, {
        success: true,
        data: divisions,
        message: "Retrieved all divisions",
        statusCode: httpStatus.OK,
    })
})

const getSingleDivision =  catchAsync(async(req: Request, res: Response) =>{
    const division =  await divisionServices.getSingleDivision(req.body)
    sendResponse(res,{
        success: true,
        message: "Division is retrieved successfully",
        statusCode: httpStatus.OK,
        data: division
    })
})

const updateDivision =  catchAsync(async(req: Request, res: Response) =>{
    const result =  await divisionServices.updateDivision(req.params.id, req.body)
    sendResponse(res, {
        success: true,
        data: result,
        message: "Updated division successfully",
        statusCode: httpStatus.OK
    })

})

const deleteDivision = catchAsync(async(req: Request, res: Response) =>{
    const result =  await divisionServices.deleteDivision(req.params.id)
    sendResponse(res, {
        success: true,
        data: result,
        message: "Deleted division successfully",
        statusCode: httpStatus.OK
    })

})

export const divisionControllers = {
    createDivision,
    getAllDivision,
    getSingleDivision,
    updateDivision,
    deleteDivision
}