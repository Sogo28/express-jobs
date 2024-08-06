import { authenticateUser, logout, refreshToken } from "../controllers/authController";
import express from "express";

const authRouter = express.Router();

authRouter.post('/', authenticateUser);

authRouter.post('/refresh-token', refreshToken);

authRouter.post('/logout', logout);

export default authRouter;