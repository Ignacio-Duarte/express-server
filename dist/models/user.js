"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.User = connection_1.default.define("user", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(45)
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING(45)
    },
    username: {
        type: sequelize_1.DataTypes.STRING(45),
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    pais: {
        type: sequelize_1.DataTypes.STRING(20)
    },
    ciudad: {
        type: sequelize_1.DataTypes.STRING(20)
    }
});
