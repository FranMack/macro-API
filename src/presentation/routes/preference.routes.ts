import { Router } from "express";
import { PreferenceControllers } from "../controllers/preference.controller";
import { validateAuth } from "../midlewares";



export class PreferenceRoutes{

    static get routes():Router{
        const router=Router()

        //definir las rutas de auth

        router.get("/list/:username",validateAuth,PreferenceControllers.preferenceList)
        router.patch("/update",validateAuth,PreferenceControllers.updatePreference)
        router.post("/send-client-data",validateAuth,PreferenceControllers.sendUserDataByEmail)
        router.post("/notifications",PreferenceControllers.sendNotification)
    
        


        


        return router

    }
}