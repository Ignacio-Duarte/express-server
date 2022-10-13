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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.getUsers = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, username, password, pais, ciudad } = req.body;
    // Encripta la pass
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    // Validar si el usuario existe en la base de datos. 
    const usuario = yield user_1.User.findOne({
        where: { username: username }
    });
    if (usuario) {
        return res.status(400).json({
            msj: `El nombre de usuario ${username} ya existe`
        });
    }
    try {
        // Guarda usuario en la base de datos.
        yield user_1.User.create({
            nombre: nombre,
            apellido: apellido,
            username: username,
            password: hashedPassword,
            pais: pais,
            ciudad: ciudad
        });
        res.json({
            msj: `Usuario ${nombre} creado exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msj: "Ocurrio un error", error
        });
    }
});
exports.newUser = newUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUsers = yield user_1.User.findAll();
    res.json(listUsers);
});
exports.getUsers = getUsers;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Valida si el usurio existe
    const usuario = yield user_1.User.findOne({
        where: { username: username }
    });
    if (!usuario) {
        return res.status(400).json({ msj: `No existe el usuario: ${username}` });
    }
    // Valida si la password es correcta.
    const passwordValid = yield bcrypt_1.default.compare(password, usuario.password);
    if (!passwordValid) {
        return res.status(400).json({
            msj: "Contraseña Incorrecta"
        });
    }
    // Genera el Token --- El token expira en 10 minutos. 
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, process.env.SECRET_KEY || "SECRET_KEY_DE_MENTIRITAS", {
        expiresIn: "600000"
    });
    res.json(token);
});
exports.loginUser = loginUser;
