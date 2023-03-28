import { Express } from "express";
import commentRepository from "../repository/comment-repository";

const router = express.Router();
// Get all comments
router.get("/", async (req, res, next) => {
    try {
       let comments = await commentRepository.getAllComments();
       return res.status(200).send(comments);
    } catch (error) {
       return next({ status: 404, message: error });
    }
 });
 export default router