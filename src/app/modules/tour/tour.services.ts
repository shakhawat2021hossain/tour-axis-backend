import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";

const createTour = async(tour: Partial<ITour>) =>{
    const {title, location, slug, tourType, division} = tour
    const result = await Tour.create({title, location, slug, tourType, division })
    return result
}

export const tourServices =  {
    createTour
}