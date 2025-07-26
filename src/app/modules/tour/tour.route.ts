import { Router } from "express";
import { tourControllers } from "./tour.controller";

const router = Router()

router.post('/tour-type/create', tourControllers.createTourType)
router.get('/tour-type', tourControllers.createTourType)
router.patch('tour-type/:id', tourControllers.createTourType)
router.delete('/tour-type/:id', tourControllers.createTourType)

export const tourRoutes = router