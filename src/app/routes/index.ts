import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { paymentRoutes } from "../modules/payment/payment.route";

export const router = Router()

const apiRoutes = [
    {
        path: '/user',
        routes: userRoutes
    },
    {
        path: '/auth',
        routes: AuthRoutes
    },
    {
        path: '/payment',
        routes: paymentRoutes
    },
]

apiRoutes.forEach(route =>{
    router.use(route.path, route.routes)
})