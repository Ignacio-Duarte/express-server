import { DataTypes } from "sequelize";
import sequelize from "../db/connection";




export const Message = sequelize.define("message", {
    id_m: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },

    username_remitente: {
        type: DataTypes.STRING
    },

    message:{
        type: DataTypes.STRING(144)
    },

    username_reseptor: {
        type: DataTypes.STRING
    }
})