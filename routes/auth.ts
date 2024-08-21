import { authenticateUser, logout, refreshToken, checkAuth } from "../controllers/authController";
import validateInputData from "../middlewares/validateInputData";
import express from "express";
import { AuthInputSchema } from "../model/domain/AuthInputSchema";

const authRouter = express.Router();

authRouter.post('/', validateInputData(AuthInputSchema), authenticateUser);

authRouter.post('/refresh-token', refreshToken);

authRouter.get('/check-auth', checkAuth);

authRouter.post('/logout', logout);

export default authRouter;