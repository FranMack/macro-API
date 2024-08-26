import {Server} from "./presentation/server"
import { envs } from "./config"
import { AppRoutes } from "./presentation/routes"
import { db } from "./data/Mongo/postgres-database"
import { Users,OfertasYseguros,AhorrosYbeneficios,TuCuenta,Tarjetas,PagoServicios,Inversiones,Cheques } from "./data/Mongo/Models"

(()=>{
    main()
})()

async function main(){

  
    await db.sync({force:false})

    const server =new Server({port:envs.PORT,routes:AppRoutes.routes})
    server.start()
    
    console.log("Hola MUNDO")}