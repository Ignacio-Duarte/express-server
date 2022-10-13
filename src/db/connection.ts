import { Sequelize } from "sequelize";

const sequelize = new Sequelize ('tp_integrador', 'root', 'Kz8be4Q!X&80', {
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize;