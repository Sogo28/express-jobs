import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { UserInputType } from "../domain/UserInputSchema";

const prisma = new PrismaClient();

export const createUser = async (data: UserInputType): Promise<User> => {

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

  return newUser;

}

export const getUserByEmail = async (email: string): Promise<User> => {

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email
    }
  })

  return user;
}

export const getUserById = async (id: string): Promise<User> => {

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id
    }
  })

  return user;
}

export const getUsers = async (): Promise<User[]> => {

  const users = await prisma.user.findMany();
  return users;

}

export const updateUser = async (data: UserInputType, id: string): Promise<User> => {

  const { email, name, password } = data;

  // Hash the password
  const hash = await bcrypt.hash(password, 10);

  const updatedUser = await prisma.user.update({
    where: {
      id
    },
    data: {
      email,
      name,
      password: hash
    }
  })

  return updatedUser;
}

export const deleteUser = async (id: string): Promise<User> => {

  const deletedUser = await prisma.user.delete({
    where: {
      id
    }
  })

  return deletedUser;

}


