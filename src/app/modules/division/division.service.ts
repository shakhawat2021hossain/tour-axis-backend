import AppError from "../../erroHelpers/AppError";
import { IDivision } from "./division.interface"
import { Division } from "./division.model";
import httpStatus from "http-status-codes"

const createDivision = async (payload: IDivision) => {
    const isExist = await Division.findOne({ name: payload.name })
    if (isExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Division already exist")
    }

    const result = await Division.create(payload)
    return result
}

const getAllDivision = async () => {
    const divisions = await Division.find({})
    return divisions
}

const getSingleDivision = async(slug: string) =>{
    const result =  await Division.findOne({slug})
    return result
}
const updateDivision = async (id: string, payload: Partial<IDivision>) => {
    const division = await Division.findById(id)
    if (!division) {
        throw new AppError(httpStatus.NOT_FOUND, "Division not found")
    }
    const result = await Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    return result
}

const deleteDivision = async(id: string) =>{
    const result = await Division.findByIdAndDelete(id)
    return result
}


export const divisionServices = {
    createDivision,
    getAllDivision,
    getSingleDivision,
    updateDivision,
    deleteDivision
}