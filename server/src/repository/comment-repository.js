import Comment from "../model/comment-model.js";
import Post from "../model/post-model.js";
import User from "../model/user-model.js";

const updateCommentById = async (pId, newContent) => {
    return await Comment.update(
        { content: newContent.content, isEdited: true },
        { where: { id: pId } }
    );
}

const getCommentById = async (pId) => {
    return await Comment.findOne({
        where: {
            id: pId
        }
    })
}
const deleteCommentById = async (pId) => {
    return await Comment.destroy({
        where: {
            id: pId
        }
    })
}
const getAllComments = async () => {
    return Comment.findAll({
        include: [
            {
                model: User, // include the User model,
                attributes: ['name']// specify which user attributes to include,
            },
        ],
        attributes: {
            exclude: ['userId']//we don't need userId anymore because we already have the user's name
        }
    });
}
const addNewComment = async (pComment) => {
    return await Comment.create(pComment)
}

const getCommentsByPostId = async (postId) => {
    const comments = await Comment.findAll({
        where: { postId: postId }
    });
    return comments;
}

export default {
    getCommentsByPostId,
    updateCommentById,
    getCommentById,
    deleteCommentById,
    addNewComment,
    getAllComments
}