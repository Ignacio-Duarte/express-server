"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessages = exports.getAllMessages = exports.getMessages = void 0;
const message_1 = require("../models/message");
const user_1 = require("../models/user");
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listMessages = yield message_1.Message.findAll({
        where: {
            username_reseptor: req.params["username"]
        },
    });
    res.json(listMessages);
});
exports.getMessages = getMessages;
const getAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listMessages = yield message_1.Message.findAll({
        where: {
            username_remitente: req.params["username"]
        },
    });
    res.json(listMessages);
});
exports.getAllMessages = getAllMessages;
const sendMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, reseptor } = req.body;
    // Valida si el usuario existe.
    const usuario = yield user_1.User.findOne({
        where: { username: reseptor },
    });
    if (!usuario) {
        return res.status(400).json({ msj: `No existe el usuario: ${reseptor}` });
    }
    try {
        yield message_1.Message.create({
            username_remitente: req.params["username"],
            message: message,
            username_reseptor: reseptor,
        });
        res.json({
            msj: "Mensaje enviado",
        });
    }
    catch (error) {
        res.status(400).json({
            msj: `${error}`,
        });
    }
});
exports.sendMessages = sendMessages;
