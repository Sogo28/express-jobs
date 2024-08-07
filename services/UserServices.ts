import { createUser as createUserDAO, getUsers as getUsersDAO } from "../model/DAO/UserDAO";
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