import bcrypt from "bcrypt";
import { getUserByEmail, getUserById } from "../model/DAO/UserDAO";
import jwt from "jsonwebtoken";
import { CustomError } from "../model/domain/CustomError";

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (user: { id: string }) => {
  return jwt.sign(user, JWT_SECRET as string, { expiresIn: '30s' });
};

const generateRefreshToken = (user: { id: string }) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });
};

export const authenticateUser = async (email: string, password: string): Promise<{ accessToken: string, refreshToken: string, user: { id: string } }> => {

  const foundUser = await getUserByEmail(email);

  const passwordMatches = bcrypt.compare(password, foundUser.password);
  if (!passwordMatches) throw new CustomError("Invalid Email or Password", 400);

  // Creating JWT
  const accessToken = generateAccessToken({ id: foundUser.id });
  const refreshToken = generateRefreshToken({ id: foundUser.id });


  return ({
    accessToken, refreshToken, user: { id: foundUser.id }
  });

}

export const refreshToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET as string) as { id: string };

    const newAccessToken = generateAccessToken({ id: decoded.id });
    const newRefreshToken = generateRefreshToken({ id: decoded.id });

    return ({ newAccessToken, newRefreshToken, decoded });

  } catch (error) {
    throw new CustomError("Invalid Refresh Token, while attempting to refresh", 403);
  }
}

export const checkAuth = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as { id: string };

    const user = await getUserById(decoded.id); // Adjust to your user-fetching logic
    return user;

  } catch (error) {
    throw new CustomError("Invalid refresh Token, while checking auth", 403)
  }
}