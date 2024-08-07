import express from "express";
import {
  createUser as createUserController,
  getUsers as getUsersController,
  getUserById as getUserController,
  updateUser as updateUserController,
  deleteUser as deleteUserController
} from "../controllers/userController"
import validateInputData from "../middlewares/validateInputData";
import { UserInputSchema } from "../model/domain/UserInputSchema";

const userRouter = express.Router();

userRouter.post('/', validateInputData(UserInputSchema), createUserController);
userRouter.get('/', getUsersController);
userRouter.get('/:id', getUserController);
userRouter.put('/:id', validateInputData(UserInputSchema), updateUserController);
userRouter.delete('/:id', deleteUserController);

export default userRouter;
