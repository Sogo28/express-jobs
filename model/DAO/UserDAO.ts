import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { CustomError } from "../domain/CustomError";

const prisma = new PrismaClient();

export const createUser = async (data: User): Promise<User> => {

  const { name, email, password } = data;

  // Hash the password
  const hash = await bcrypt.hash(password, 10);

  // create the user
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hash
    }
  })

  if (!newUser) throw new CustomError('Failed to create the user', 500);

  // Send the new User
  return newUser;

}

export const getUserByEmail = async (email: string): Promise<User> => {

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) throw new CustomError("User not found", 404);

  return user;
}

export const getUsers = async (): Promise<User[]> => {

  const users = await prisma.user.findMany();

  return users;
}
