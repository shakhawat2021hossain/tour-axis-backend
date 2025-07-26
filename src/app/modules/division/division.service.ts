import AppError from "../../erroHelpers/AppError";
import { IDivision } from "./division.interface"
import { Division } from "./division.model";
import httpStatus from "http-status-codes"

const createDivision = async(payload: IDivision) =>{
    const isExist = await Division.findOne({name: payload.name})
    if(isExist){
        throw new AppError(httpStatus.BAD_REQUEST, "Division already exist")
    }

    const result = await Division.create(payload)
    return result
}

export const divisionServices = {
    createDivision
}