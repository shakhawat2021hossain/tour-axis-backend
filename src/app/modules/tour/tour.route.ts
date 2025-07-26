import { Router } from "express";
import { tourControllers } from "./tour.controller";

const router = Router()

router.post('/create', tourControllers.createTour)
router.get('/', tourControllers.getAllTour)
router.patch('/:id', tourControllers.updateTour)
router.delete('/:id', tourControllers.deleteTour)
router.post('/tour-type/create', tourControllers.createTourType)
router.get('/tour-type', tourControllers.getAllTourType)
router.patch('tour-type/:id', tourControllers.updateTourType)
router.delete('/tour-type/:id', tourControllers.deleteTourType)

export const tourRoutes = router