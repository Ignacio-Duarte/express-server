"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Message = connection_1.default.define("message", {
    id_m: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true
    },
    username_remitente: {
        type: sequelize_1.DataTypes.STRING
    },
    message: {
        type: sequelize_1.DataTypes.STRING(144)
    },
    username_reseptor: {
        type: sequelize_1.DataTypes.STRING
    }
});
