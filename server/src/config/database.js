import sequelize from './connection.js';
import Post from "../model/post-model.js";
import User from "../model/user-model.js";
import Comment from "../model/comment-model.js";

User.hasMany(Comment, { foreignKey: 'userId', onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'userId' });

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await User.sync();
    await Post.sync();
    await Comment.sync();

    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
connectToDatabase();