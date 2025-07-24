import { Types } from "mongoose";

export interface ITourType {
    name: string
}

export interface ITour {
    title: string;
    slug: string;
    location: string;
    description?: string;
    images?: string[];
    startDate?: Date;
    endDate?: Date;
    arrivalLocation?: string;
    depertureLocation?: string;
    amenities?: string[];
    tourPlan?: string[];
    included?: string[];
    excluded?: string[];
    maxGuest?: number;
    minAge?: number;
    division?: Types.ObjectId;
    tourType?: Types.ObjectId;

}