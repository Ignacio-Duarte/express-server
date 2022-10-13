import cors from "cors";
import express from "express"
import sequelize from "../db/connection";
import routerMessage from "../routes/message"
import routerUser from "../routes/user"
import { Message } from "./message";
import { User } from "./user";


class Server {
    private app: express.Application
    private port: String


    constructor(){
        this.app = express()
        this.port = process.env.PORT || "3001"
        this.listen()
        this.dbConnection()
        this.middleware()
        this.routes()
    }


    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor escuchando el puerto: " + this.port)
        })
    }

    routes(){
        this.app.use("/api/users", routerUser)
        this.app.use("/", routerMessage)
    }

    middleware (){
        // Parseo body
        this.app.use(express.json())

        // Cors 
        this.app.use(cors())
    }


    async dbConnection(){
        try{
            await Message.sync()
            await User.sync()
        }catch(error){
            console.log("Error de conexion")
        }
    }


}

export default Server;