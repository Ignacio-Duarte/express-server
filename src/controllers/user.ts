import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { User } from "../models/user";
import jwt from 'jsonwebtoken'


export const newUser = async (req: Request, res: Response) => {

    const {nombre, apellido, username, password, pais, ciudad} = req.body

    // Encripta la pass
    const hashedPassword = await bcrypt.hash(password, 10)

    // Validar si el usuario existe en la base de datos. 
    const usuario = await User.findOne({
        where: {username: username}
    })

    if(usuario){
        return res.status(400).json({
            msj: `El nombre de usuario ${username} ya existe`
        })
    }

    try {
        // Guarda usuario en la base de datos.
        await User.create({
            nombre: nombre,
            apellido: apellido,
            username: username,
            password: hashedPassword,
            pais: pais,
            ciudad: ciudad
        })
    
        res.json({
            msj: `Usuario ${nombre} creado exitosamente`
        })
    } catch (error) {
        res.status(400).json({
            msj: "Ocurrio un error", error
        })
    }
}

export const getUsers = async (req: Request, res: Response ) => {
    const listUsers = await User.findAll()
    res.json(listUsers)
}




export const loginUser = async (req: Request, res: Response) => {
    
    const {username, password} = req.body

    // Valida si el usurio existe

    const usuario: any = await User.findOne({
        where: {username: username}
    })

    if(!usuario){
        return res.status(400).json({msj: `No existe el usuario: ${username}`})
    }


    // Valida si la password es correcta.
    const passwordValid = await bcrypt.compare(password, usuario.password)

    if(!passwordValid){
        return res.status(400).json({
            msj: "Contraseña Incorrecta"
        })
    }

    // Genera el Token --- El token expira en 10 minutos. 
    const token = jwt.sign({
        username: username
    }, process.env.SECRET_KEY || "SECRET_KEY_DE_MENTIRITAS", {
        expiresIn: "600000"
    })

    res.json(token)
}

