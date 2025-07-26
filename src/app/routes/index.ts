import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { paymentRoutes } from "../modules/payment/payment.route";
import { divisionRoutes } from "../modules/division/division.route";

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
    {
        path: '/division',
        routes: divisionRoutes
    },
]

apiRoutes.forEach(route =>{
    router.use(route.path, route.routes)
})