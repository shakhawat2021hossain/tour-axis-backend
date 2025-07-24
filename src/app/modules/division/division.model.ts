import { model, Schema } from "mongoose";
import { IDivision } from "./division.interface";

const divisionSchema = new Schema<IDivision>({
    name: {type: String, required: true, unique: true},
    slug: {type: String, required: true},
    thumbnail: {type: String},
    description: {type: String},
},{
    timestamps: true
})

export const division =  model("Division", divisionSchema)