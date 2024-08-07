import { Request, Response } from "express";
import {
  createJob as createJobService,
  getJobById as getJobByIdService,
  getJobs as getJobsService,
  updateJob as updateJobService,
  deleteJob as deleteJobService
} from "../services/JobServices";

// @desc    Create a Job
// @route   POST /api/jobs
// @access  Public
export const createJob = async (req: Request, res: Response) => {

  try {
    const newJob = await createJobService(req.body);
    res.status(201).json({
      message: "Job created successfully",
      data: newJob
    })

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }

}

// @desc    Get a Job by its id
// @route   GET /api/jobs/:id
// @access  Public
export const getJob = async (req: Request, res: Response) => {

  const id = req.params.id;
  try {
    const job = await getJobByIdService(id);
    res.status(200).json(job);

  } catch (error: any) {
    if (error.code === "P2025" || error.code === "P2023") {
      res.status(404).json({ message: "Job not found" });

    } else {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
}

// @desc    Get all Jobs 
// @route   GET /api/jobs/
// @access  Public
export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await getJobsService();
    res.status(200).json(jobs);

  } catch (error: any) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

// @desc    Update a Job 
// @route   PUT /api/jobs/:id
// @access  Public
export const updateJob = async (req: Request, res: Response) => {

  const id = req.params.id;
  try {
    const updatedJob = await updateJobService(req.body, id);
    res.status(204).json({
      message: "Job updated successfully",
      data: updatedJob
    })

  } catch (error: any) {
    if (error.code === "P2025" || error.code === "P2023") {
      res.status(404).json({ message: "Job not found" });

    } else {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }

}

// @desc    Delete a Job 
// @route   DELETE /api/jobs/:id
// @access  Public
export const deleteJob = async (req: Request, res: Response) => {

  const id = req.params.id;
  try {
    const deletedJob = await deleteJobService(id);
    res.status(204).json({
      message: "Job deleted successfully",
      data: deletedJob
    })

  } catch (error: any) {
    if (error.code === "P2025" || error.code === "P2023") {
      res.status(404).json({ message: "Job not found" });

    } else {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }

}