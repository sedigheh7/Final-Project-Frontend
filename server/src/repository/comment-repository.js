import Comment from "../model/comment-model";
const getAllComments = async () => {
    const comments = await Comment.findAll();
    return comments;
};


export default getAllComments