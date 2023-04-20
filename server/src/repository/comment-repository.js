import Comment from "../model/comment-model.js";
import Post from "../model/post-model.js";
const getAllComments = async () => {
    const comments = await Comment.findAll();
    return comments;
};



const createComment = async (pComment) => {
    const newComment = await Comment.create(pComment);
    return newComment;
};
const getCommentById = async (pCommentId) => {
    const Comment = await Comment.findOne({ where: { id: pCommentId } });
    return Comment;
};

// const getAllCommentsByPost = async (postId) => {
//     try {
//       const post = await Post.findByPk(postId, {
//         include: {
//           model: Comment,
//           as: 'Comments'
//         }
//       });
  
//       return post.Comments;
//     } catch (error) {
//       throw new Error(`Error fetching Comments for user with id ${postId}: ${error.message}`);
//     }
//   };
const getAllCommentsByPost = async (pPostId) => {
  try {
    return await Comment.findAll({ where: { PostId: pPostId } });
  } catch (error) {
    console.log(error);
  }
};

  const editComment = async (CommentId, updatedCommentData) => {
    try {
      const [rowsUpdated, [updatedComment]] = await Comment.update(updatedCommentData, {
        returning: true,
        where: { id: CommentId }
      });
  
      if (rowsUpdated !== 1) {
        throw new Error(`Error updating Comment with id ${CommentId}`);
      }
  
      return updatedComment;
    } catch (error) {
      throw new Error(`Error updating Comment with id ${CommentId}: ${error.message}`);
    }
  };


export default {
    getAllComments,
    createComment,
    getCommentById,
    getAllCommentsByPost,
    editComment,
};
