import sequelize from '../config/connection.js';
import { DataTypes }  from 'sequelize';  
const Comment = sequelize.define('comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isEdited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  });
  
  // Associations
  const User = require('./User');
  const Post = require('./Post');
  
  Comment.belongsTo(User);
  Comment.belongsTo(Post);

  export default Comment