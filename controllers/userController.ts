import { Request, Response } from "express";
import {
  createUser as createUserService,
  getUsers as getUsersService,
  getUserById as getUserByIdService,
  updateUser as updateUserService,
  deleteUser as deleteUserService
} from "../services/UserServices";
import { CustomError } from "model/domain/CustomError";

// @desc    Create a user
// @route   POST /api/users
// @access  Public
export const createUser = async (req: Request, res: Response) => {

  try {
    const newUser = await createUserService(req.body);
    res.status(201).json({
      message: "User created successfully",
      data: newUser
    })

  } catch (error: any) {

    if (error instanceof CustomError) {
      return res.status(error.status).json({ message: error.message })
    }
    else {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error', error: error });
    }
  }

}

// @desc    Get all users
// @route   GET /api/users
// @access  Public
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersService();
    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

// @desc    Get user by its id
// @route   GET /api/users/:id
// @access  Public
export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await getUserByIdService(id);
    res.status(200).json(user);

  } catch (error: any) {
    if (error.code === "P2025" || error.code === "P2023") {
      res.status(404).json({ message: "User not found" });

    } else {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
}


// @desc    Update a User
// @route   PUT /api/users/:id
// @access  Public
export const updateUser = async (req: Request, res: Response) => {

  const id = req.params.id;
  try {
    const updatedUser = await updateUserService(req.body, id);
    res.status(204).json({
      message: "User updated successfully",
      data: updatedUser
    })

  } catch (error: any) {
    console.log(error)
    if (error.code === "P2025" || error.code === "P2023") {
      res.status(404).json({ message: "Job not found" });

    } else {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }

}

// @desc    Delete a User 
// @route   DELETE /api/users/:id
// @access  Public
export const deleteUser = async (req: Request, res: Response) => {

  const id = req.params.id;
  try {
    const deletedUser = await deleteUserService(id);
    res.status(204).json({
      message: "User deleted successfully",
      data: deletedUser
    })

  } catch (error: any) {
    if (error.code === "P2025" || error.code === "P2023") {
      res.status(404).json({ message: "User not found" });

    } else {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }

}