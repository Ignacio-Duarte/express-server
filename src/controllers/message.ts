import { Request, Response } from "express";
import { Message } from "../models/message";
import { User } from "../models/user";

export const getMessages = async (req: Request, res: Response) => {
  const listMessages = await Message.findAll({
    where: {
      username_reseptor: req.params["username"]
    },
  });

  res.json(listMessages);
};

export const getAllMessages = async (req: Request, res: Response) => {
  const listMessages = await Message.findAll({
    where: {
      username_remitente: req.params["username"]
    },
  });

  res.json(listMessages);
};



export const sendMessages = async (req: Request, res: Response) => {
    const { message, reseptor } = req.body;

    // Valida si el usuario existe.
    const usuario: any = await User.findOne({
        where: { username: reseptor },
    });

    if (!usuario) {
        return res.status(400).json({ msj: `No existe el usuario: ${reseptor}` });
    }

    try {
        await Message.create({
            username_remitente: req.params["username"],
            message: message,
            username_reseptor: reseptor,
        });

        res.json({
            msj: "Mensaje enviado",
        });
    } catch (error) {
        res.status(400).json({
        msj: `${error}`,
        });
    }
};
