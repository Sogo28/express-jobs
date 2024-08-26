import { Request, Response } from "express";
import {
  getJobsByEmployer as getJobsByEmployerService,
} from "../services/JobServices";
import {
  getCompanyByUserId as getCompanyByUserIdService
} from "../services/CompanyServices"
// @desc    Get all Jobs 
// @route   GET /api/jobs/
// @access  Public
export const getJobs = async (req: Request, res: Response) => {

  const id = req.params.id;

  try {
    const jobs = await getJobsByEmployerService(id);
    res.status(200).json(jobs);

  } catch (error: any) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const getCompany = async (req: Request, res: Response) => {

  const id = req.params.id;

  try {

    const company = await getCompanyByUserIdService(id);
    res.status(200).json(company)

  } catch (error: any) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}