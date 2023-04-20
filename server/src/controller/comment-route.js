import  express  from "express";
import commentRepository from "../repository/comment-repository.js";

const router = express.Router();
// Get all comments
// router.get("/", async (req, res, next) => {
//     try {
//        let comments = await commentRepository.getAllComments();
//        return res.status(200).send(comments);
//     } catch (error) {
//        return next({ status: 404, message: error });
//     }
//  });
 router.get("/", async (req, res) => {
   const { PostId } = req.query;
   if (PostId) {
     return res.json(await commentRepository.getAllCommentsByPost(PostId));
   }
   return res.json(await commentRepository.getAllComments());
 });
// Create a new Comment
router.post("/", async (req, res, next) => {
   try {
      const { body } = req;
      const newComment = await commentRepository.createComment(body);
      return res.send(newComment);
   } catch (error) {
      return next({ status: 500, message: error });
   }
});

// Get a single Comment by id
router.get("/:id", async (req, res, next) => {
   try {
      const commentId = req.params.id;
      const selectedComment = await commentRepository.getCommentById(commentId);
      if (selectedComment === null)
         return next({
            status: 404,
            message: `Comment with id  ${commentId} not found`,
         });
      return res.status(200).send(selectedComment);
   } catch (err) {
      return next({ status: 500, message: err });
   }
});

// get all Comments by a post
// router.get('/:postId/comments', async (req, res) => {
//    const postId = req.params.postId;
 
//    try {
//      const Comments = await commentRepository.getAllCommentsByPost(postId);
//      res.json(Comments);
//    } catch (error) {
//      res.status(500).json({ message: error.message });
//    }
//  });

//edit aComment
 router.put('/:commentId', async (req, res) => {
   const CommentId = req.params.CommentId;
   const updatedCommentData = req.body;
 
   try {
     const updatedComment = await commentRepository.editComment(CommentId, updatedCommentData);
     res.json(updatedComment);
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 });
 export default router