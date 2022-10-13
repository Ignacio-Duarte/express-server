import { DataTypes } from "sequelize";
import sequelize from "../db/connection";




export const User = sequelize.define("user", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING(45)
    },

    apellido:{
        type: DataTypes.STRING(45)
    },

    username:{
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false
    },

    password:{
        type: DataTypes.STRING,
        allowNull: false
    },

    pais: {
        type: DataTypes.STRING(20)
    },

    ciudad: {
        type: DataTypes.STRING(20)
    }
})

