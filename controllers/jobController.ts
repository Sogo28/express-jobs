import { Request, Response } from "express";
import { createJob as createJobService, getJobById as getJobByIdService, updateJob as updateJobService, getJobs as getJobsService } from "../services/JobServices";
import { CustomError } from "../model/domain/CustomError";

// @desc    Create a Job
// @route   POST /api/Jobs
// @access  Public
export const createJob = async (req: Request, res: Response) => {

  try {
    const newJob = await createJobService(req.body);
    res.status(201).json({
      message: "Job created successfully",
      data: newJob
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

// @desc    Get a Job by its id
// @route   GET /api/Job/:id
// @access  Public
export const getJob = async (req: Request, res: Response) => {

  const jobId = req.params.JobId;
  try {
    const job = await getJobByIdService(jobId);
    res.status(200).json(job);

  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });

    } else {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
}

// @desc    Get all Jobs 
// @route   GET /api/Job/
// @access  Public
export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await getJobsService();
    res.status(200).json(jobs);

  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });

    } else {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
}

// @desc    Update a Job 
// @route   PUT /api/Job/:id
// @access  Public
export const updateJob = async (req: Request, res: Response) => {

  const jobId = req.params.JobId;
  try {
    const updatedJob = await updateJobService(req.body, jobId);
    res.status(204).json({
      message: "Job updated successfully",
      data: updatedJob
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