import {
  createUser as createUserDAO,
  getUsers as getUsersDAO,
  getUserById as getUserByIdDAO,
  updateUser as updateUserDAO,
  deleteUser as deleteUserDAO,

} from "../model/DAO/UserDAO";
import { User } from "@prisma/client";
import { UserInputType } from "../model/domain/UserInputSchema";

export const createUser = async (data: UserInputType): Promise<User> => {

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