import express from "express";
import { createUser as createUserController, getUsers as getUsersController } from "../controllers/userController"
import validateUser from "../middlewares/validateUser";
import { UserInputSchema } from "../model/domain/UserInputSchema";

const userRouter = express.Router();

userRouter.post('/', validateUser(UserInputSchema), createUserController);
userRouter.get('/', getUsersController);

export default userRouter;
