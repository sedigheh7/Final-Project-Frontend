import User from "../model/user-model.js";
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'
dotenv.config()

const getAllUsers = async() => {
  console.log("users")
    const users = await User.findAll();
    return users
};

const createUser = async (pUser) => {
    const newUser = await User.create(pUser);
    
      const transporter = nodemailer.createTransport({
        service:'gmail',
        
          auth: {
              user:'sedigheh.asgarifard@hicoders.ch',
              pass:process.env.GMAIL_PASS
          },
          tls: { rejectUnauthorized: false },
          ignoreTLS: true,
      })
  
        const emailOptions = {
          from: "sedigheh.asgarifard@hicoders.ch",
          to: pUser.email,
          subject: "Hello",
          html: "Welcome to Bloggy",
        };
        transporter.sendMail(emailOptions, (err, info) => {
          if (err) {
            console.log("hello")
            console.error(err);
          } else console.log(info);
        });
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