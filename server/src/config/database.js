import sequelize from './connection.js';
import Post from "../model/post-model.js";
import User from "../model/user-model.js";
import Comment from "../model/comment-model.js";

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.hasMany(Post);
Post.belongsTo(User);

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