import express from "express";
import userRepository from "../repository/user-repository.js";

const router = express.Router();
//get all users
router.get("/", async (req, res, next) => {
    try {
        let users = await userRepository.getAllUsers();
        return res.status(200).json(users);
    }catch (error) {
        return next({status: 404, message:error});
    }
});

// creat a new user
router.post("/", async(req, res, next) => {
    try {
        const {body} =req;
        const newUser = await userRepository.createUser(body);
        return res.send(newUser);
    }catch (error) {
        return next({status: 500, message: error})
    }
});

// delete a user

router.delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedUser = await userRepository.deleteUser(id);
      res.json(deletedUser);
    } catch (error) {
      next(error);
    }
  });
  export default router
  