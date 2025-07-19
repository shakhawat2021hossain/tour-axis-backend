import { Router } from "express"
import { paymentControllers } from "./payment.controller"

const router = Router()
router.post('/init', paymentControllers.initiation)

export const paymentRoutes = router