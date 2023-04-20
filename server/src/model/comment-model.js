import sequelize from '../config/connection.js';
import { DataTypes }  from 'sequelize';  
const Comment = sequelize.define('Comment', {
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
  import User  from './user-model.js';
  import Post from './post-model.js';
  
  Comment.belongsTo(User);
  Comment.belongsTo(Post);

  export default Comment