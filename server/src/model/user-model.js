import sequelize from '../config/connection.js';
import { DataTypes }  from 'sequelize';  

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  });

  export default User