import { createUser as createUserDAO, getUsers as getUsersDAO } from "../model/DAO/UserDAO";
import { User } from "@prisma/client";

export const createUser = async (data: User): Promise<User> => {

  const newUser = await createUserDAO(data);
  return newUser;

}

export const getUsers = async (): Promise<User[]> => {

  const users = await getUsersDAO();
  return users;

}