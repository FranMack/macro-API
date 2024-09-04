import { Router } from "express";
import { AutControllers } from "../controllers/auth.controller";
import { validateAuth } from "../midlewares";



export class AuthRoutes{

    static get routes():Router{
        const router=Router()

        //definir las rutas de auth

        router.post("/register",AutControllers.register)
        router.post("/login",AutControllers.login)
        router.get("/validate-email/:token",AutControllers.validateUser)
        router.get("/forgot-password/:username",AutControllers.forgotPassword)
        router.get("/me",validateAuth,AutControllers.me)
        router.post("/restore-password",AutControllers.restorePassword)
        router.get("/info/:username",validateAuth,AutControllers.getUserInfo)
        router.post("/info/edit",validateAuth,AutControllers.editUserInfo)
        


        


        return router

    }
}