import { Sequelize } from "sequelize"

const conn = new Sequelize('ade2024', 'root', 'Sen@iDev77!.', {
    host: 'localhost',
    dialect: 'mysql'
  });

export default conn