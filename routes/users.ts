import express from "express";
import { createUser as createUserController, getUsers as getUsersController } from "../controllers/userController"
import validateInputData from "../middlewares/validateInputData";
import { UserInputSchema } from "../model/domain/UserInputSchema";

const userRouter = express.Router();

userRouter.post('/', validateInputData(UserInputSchema), createUserController);
userRouter.get('/', getUsersController);

export default userRouter;
