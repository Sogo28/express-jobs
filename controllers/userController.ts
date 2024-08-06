import { Request, Response } from "express";
import { createUser as createUserService, getUsers as getUsersService } from "../services/UserServices";
import { CustomError } from "../model/domain/CustomError";

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

  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });
    }
    else {
      res.status(500).json({ message: "Internal Server Error" });
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
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });

    } else {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
}
