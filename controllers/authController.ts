import { Request, Response } from "express";
import { authenticateUser as authenticateUserService, refreshToken as refreshTokenService, checkAuth as checkAuthService } from "../services/AuthServices";
import { CustomError } from "../model/domain/CustomError";
import jwt from "jsonwebtoken";

// @desc    Authenticate an user
// @route   POST /api/auth/
// @access  Public
export const authenticateUser = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  try {
    const { accessToken, refreshToken, user } = await authenticateUserService(email, password);
    res.cookie('refreshToken', refreshToken,
      {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // un jour 
        secure: true,
        sameSite: "none"
      }
    )
    res.json({ accessToken, user });
    // res.cookie('accessToken', accessToken,
    //   {
    //     httpOnly: true,
    //     maxAge: 15 * 60 * 1000, // 15 minutes
    //     secure: true,
    //     sameSite: "none"
    //   }
    // )
    // res.json(user)

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
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Access denied. No refresh token provided.' });
  }

  try {
    const { newAccessToken, newRefreshToken, decoded } = await refreshTokenService(refreshToken);
    res.cookie('refreshToken', newRefreshToken,
      {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "none"
      })
    // res.cookie('accessToken', newAccessToken,
    //   {
    //     httpOnly: true,
    //     maxAge: 15 * 60 * 1000, // 15 minutes
    //     secure: true,
    //     sameSite: "none"
    //   })
    res.json({ newAccessToken, user: { id: decoded.id } })
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });

    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

}

export const checkAuth = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const user = await checkAuthService(token);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user }); // Return user data
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
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