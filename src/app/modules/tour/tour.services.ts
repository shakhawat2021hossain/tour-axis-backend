import AppError from "../../erroHelpers/AppError";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import httpStatus from "http-status-codes"


/* Tour */
const createTour = async (payload: ITour) => {

    const isExist = await Tour.findOne({ title: payload.title })
    if (isExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Tour is already exist")
    }
    const result = await Tour.create(payload)
    return result
}

const getAllTour = async () => {
    const tours = await TourType.find({})
    return tours

}

const updateTour = async (id: string, payload: Partial<ITour>) => {
    const existingTour = await Tour.findById(id);

    if (!existingTour) {
        throw new Error("Tour not found.");
    }
    const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

    return updatedTour;

};

const deleteTour = async (id: string) => {
    return await Tour.findByIdAndDelete(id);
};


/* Tour Type*/
const createTourType = async (payload: ITourType) => {
    const isExist = await TourType.findOne({ name: payload.name })
    if (!isExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Tour type already exist")
    }

    const result = await TourType.create(payload)
    return result
}

const getAllTourType = async () => {
    const tourTypes = await TourType.find({})
    return tourTypes
}

const updateTourType = async (id: string, payload: Partial<ITourType>) => {
    const tourType = await TourType.findById(id)
    if (!tourType) {
        throw new AppError(httpStatus.NOT_FOUND, "Tour Type not found")
    }
    const result = await TourType.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    return result
}

const deleteTourType = async (id: string) => {
    const result = await TourType.findByIdAndDelete(id)
    return result
}
export const tourServices = {
    createTour,
    getAllTour,
    updateTour,
    deleteTour,
    createTourType,
    getAllTourType,
    updateTourType,
    deleteTourType
}