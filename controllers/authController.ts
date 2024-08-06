import { Request, Response } from "express";
import { authenticateUser as authenticateUserService, refreshToken as refreshTokenService } from "../services/AuthServices";
import { CustomError } from "../model/domain/CustomError";

// @desc    Authenticate an user
// @route   POST /api/auth/
// @access  Public
export const authenticateUser = async (req: Request, res: Response) => {

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Please give an email and a password" })

  try {
    const { accessToken, refreshToken } = await authenticateUserService(email, password);
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true, sameSite: "none" })
    res.json(accessToken);

  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });

    } else {
      res.status(500).json({ message: 'Internal Server Error', error: error });
    }
  }

}

// @desc    Refresh a token
// @route   POST /api/auth/refreshtoken
// @access  Public
export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.jwt;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Access denied. No refresh token provided.' });
  }

  try {
    const { newAccessToken, newRefreshToken } = await refreshTokenService(refreshToken);
    res.json(newAccessToken);
    res.cookie('jwt', newRefreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true, sameSite: "none" })

  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });

    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

}

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',

  });
  res.json({ message: 'Logged out successfully' });
};