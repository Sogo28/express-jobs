import {
  createUser as createUserDAO,
  getUsers as getUsersDAO,
  getUserById as getUserByIdDAO,
  updateUser as updateUserDAO,
  deleteUser as deleteUserDAO,
  getUserByEmail as getUserByEmailDAO,

} from "../model/DAO/UserDAO";
import { PrismaClient, User } from "@prisma/client";
import { UserInputType } from "../model/domain/UserInputSchema";
import { CustomError } from "model/domain/CustomError";

export const createUser = async (data: UserInputType): Promise<User> => {

  const prisma = new PrismaClient();

  const existingRecord = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  })


  if (existingRecord) {
    throw new CustomError("This user already Exist", 409)
  }

  const newUser = await createUserDAO(data);

  return newUser;

}

export const getUsers = async (): Promise<User[]> => {

  const users = await getUsersDAO();
  return users;

}

export const getUserById = async (id: string): Promise<User> => {

  const user = await getUserByIdDAO(id);
  return user;

}

export const updateUser = async (data: UserInputType, id: string): Promise<User> => {

  const updatedUser = await updateUserDAO(data, id);
  return updatedUser;

}

export const deleteUser = async (id: string): Promise<User> => {

  const deletedUser = await deleteUserDAO(id);
  return deletedUser;

}