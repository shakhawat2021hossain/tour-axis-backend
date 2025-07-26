import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { tourServices } from "./tour.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"

const createTourType = catchAsync(async(req:Request, res: Response) =>{
    const tourType = await tourServices.createTourType(req.body)
    
    sendResponse(res, {
        success: true,
        message: "Create a new tour type",
        statusCode: httpStatus.CREATED,
        data: tourType
    })
})

const getAllTourType = catchAsync(async(req:Request, res: Response) =>{
    const tourType = await tourServices.getAllTourType()
    
    sendResponse(res, {
        success: true,
        message: "Retrived all tour types",
        statusCode: httpStatus.OK,
        data: tourType
    })
})


const updateTourType = catchAsync(async(req:Request, res: Response) =>{
    const tourType = await tourServices.updateTourType(req.params.id, req.body)
    
    sendResponse(res, {
        success: true,
        message: "updated tour type",
        statusCode: httpStatus.OK,
        data: tourType
    })
})


const deleteTourType = catchAsync(async(req:Request, res: Response) =>{
    const tourType = await tourServices.deleteTourType(req.params.id)
    
    sendResponse(res, {
        success: true,
        message: "Deleted tour type",
        statusCode: httpStatus.OK,
        data: tourType
    })
})
export const tourControllers = {
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType
}