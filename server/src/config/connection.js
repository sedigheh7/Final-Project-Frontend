import { Sequelize } from "sequelize";

const sequelize = new Sequelize('Bloggy', 'hicoders', 'hicoders_12', {
    host: 'localhost',
    dialect: 'mysql'
  });

export default sequelize;