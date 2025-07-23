import { Router } from "express";
import { userControllers } from "./user.controller";
import { validateReq } from "../../middlewares/validateReq";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router()
router.post('/register', validateReq(createUserZodSchema), userControllers.createUser)
router.get('/users', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), userControllers.getAllUser)
router.patch('/:id', validateReq(updateUserZodSchema), checkAuth(...Object.values(Role)), userControllers.updateUser)

export const userRoutes = router