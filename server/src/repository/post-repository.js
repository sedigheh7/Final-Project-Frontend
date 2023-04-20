import Post from "../model/post-model.js";
import User from "../model/user-model.js"

const getAllPosts = async () => {
    const posts = await Post.findAll();
    return posts;
};

const createPost = async (pPost) => {
    const newPost = await Post.create(pPost);
    return newPost;
};
const getPostById = async (postId) => {
    const post = await Post.findOne({ where: { id: postId } });
    return post;
};
const getAllPostsByUser = async (pUserId) => {
  try {
    return await Post.findAll({ where: { UserId: pUserId } });
  } catch (error) {
    console.log(error);
  }
};
// const getAllPostsByUser = async (UserId) => {
//     try {
//       const user = await User.findByPk(UserId, {
//         include: {
//           model: Post,
//           as: 'Post'
//         }
//       });
  
//       return user.posts;
//     } catch (error) {
//       throw new Error(`Error fetching posts for user with id ${UserId}: ${error.message}`);
//     }
//   };

  const editPost = async (postId, updatedPostData) => {
    try {
      const [rowsUpdated, [updatedPost]] = await Post.update(updatedPostData, {
        returning: true,
        where: { id: postId }
      });
  
      // if (rowsUpdated !== 1) {
      //   throw new Error(`Error updating post with id ${postId}`);
      // }
  
      return updatedPost;
    } catch (error) {
      throw new Error(`Error updating post with id ${postId}: ${error.message}`);
    }
  };

  async function deletePost(puserId){
    await Customer.destroy({
        where: {
          id: puserId
        }
       }); 
}


export default {
    getAllPosts,
    createPost,
    getPostById,
    getAllPostsByUser,
    editPost,
    deletePost
};
