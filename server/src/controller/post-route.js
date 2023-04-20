import express from "express";
import postRepository from "../repository/post-repository.js";

const router = express.Router();

// Get all posts

router.get("/", async (req, res) => {
   const { UserId } = req.query;
   if (UserId) {
     return res.json(await postRepository.getAllPostsByUser(UserId));
   }
   return res.json(await postRepository.getAllPosts());
 });
// Create a new post
router.post("/", async (req, res, next) => {
   try {
      const { body } = req;
      const newPost = await postRepository.createPost(body);
      return res.send(newPost);
   } catch (error) {
      return next({ status: 500, message: error });
   }
});

// Get a single post by id
router.get("/:id", async (req, res, next) => {
   try {
      const postId = req.params.id;
      const selectedPost = await postRepository.getPostById(postId);
      if (selectedPost === null)
         return next({
            status: 404,
            message: `post with id  ${postId} not found`,
         });
      return res.status(200).send(selectedPost);
   } catch (err) {
      return next({ status: 500, message: err });
   }
});

// get all posts by a user
// router.get('/:userId/posts', async (req, res) => {
//    const userId = req.params.userId;
 
//    try {
//      const posts = await postRepository.getAllPostsByUser(userId);
//      res.json(posts);
//    } catch (error) {
//      res.status(500).json({ message: error.message });
//    }
//  });

//edit apost
 router.put('/:postId', async (req, res) => {
   const postId = req.params.postId;
   const updatedPostData = req.body;
 
   try {
     const updatedPost = await postRepository.editPost(postId, updatedPostData);
     res.json(updatedPost);
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 });
 //delete a post
 router.delete('/:id', async (request, response) => {
   const userId = request.params.id;
   await postRepository.deletePost(userId);
   response.status(200).json();
});

export default router;