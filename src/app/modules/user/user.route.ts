import { Router } from "express";
import { userControllers } from "./user.controller";
import { validateReq } from "../../middlewares/validateReq";
import { createUserZodSchema } from "./user.validation";

const router = Router()
router.post('/register', validateReq(createUserZodSchema) , userControllers.createUser)
router.get('/users', userControllers.getAllUser)

export const userRoutes = router