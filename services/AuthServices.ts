import bcrypt from "bcrypt";
import { getUserByEmail } from "../model/DAO/UserDAO";
import jwt from "jsonwebtoken";
import { CustomError } from "../model/domain/CustomError";

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (user: { email: string }) => {
  return jwt.sign(user, JWT_SECRET as string, { expiresIn: '15m' });
};

const generateRefreshToken = (user: { email: string }) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });
};

export const authenticateUser = async (email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> => {

  const foundUser = await getUserByEmail(email);

  const passwordMatches = bcrypt.compare(password, foundUser.password);
  if (!passwordMatches) throw new CustomError("Invalid Email or Password", 400);

  // Creating JWT
  const accessToken = generateAccessToken({ email: foundUser.email });
  const refreshToken = generateRefreshToken({ email: foundUser.email });

  return ({ accessToken, refreshToken });

}

export const refreshToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET as string) as { email: string };

    const newAccessToken = generateAccessToken({ email: decoded.email });
    const newRefreshToken = generateRefreshToken({ email: decoded.email });

    return ({ newAccessToken, newRefreshToken });

  } catch (error) {
    throw new CustomError("Invalid Refresh Token", 403);
  }
}
