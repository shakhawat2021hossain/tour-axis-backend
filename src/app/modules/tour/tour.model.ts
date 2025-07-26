import { model, Schema } from "mongoose";
import { ITour, ITourType } from "./tour.interface";

const tourTypeSchema =  new Schema<ITourType>({
    name: {type: String, required: true, unique: true}
},
{
    timestamps: true
})

export const TourType = model("TourType", tourTypeSchema)

const tourSchema = new Schema<ITour>({
    title: {type: String, required: true},
    slug: {type: String, required: true},
    description: {type: String},
    images: {type: [String], default: []},
    location: {type: String, required: true},
    endDate: {type: Date},
    startDate: {type: Date},
    arrivalLocation: {type: String},
    depertureLocation: {type: String},
    maxGuest: {type: Number},
    minAge: {type: Number},
    included: {type: [String], default: []},
    excluded: {type: [String], default: []},
    tourPlan: {type: [String], default: []},
    amenities: {type: [String], default: []},
    division: {
        type: Schema.Types.ObjectId,
        ref: "Division", // Division model er obj id nibe 
        required: true
    },
    tourType: {
        type: Schema.Types.ObjectId,
        ref: "TourType", 
        required: true
    }


},
{
    timestamps: true
})

export const Tour = model("Tour", tourSchema)