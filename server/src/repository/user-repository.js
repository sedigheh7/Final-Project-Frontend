import User from "../model/user-model";

const getAllUsers = async() => {
    const users = await User.findAll();
    return users
};

const createUser = async (pUser) => {
    const newUser = await User.create(pUser);
    return newUser;
};

const deleteUser = async (id) => {
      try {
        const user = await User.findByPk(id);
        if (!user) {
          throw new Error(`User with id ${id} does not exist`);
        }
        await user.destroy();
        return user;
      } catch (error) {
        throw error;
      }
    };

export default {
    getAllUsers,
    createUser,
    deleteUser,
}