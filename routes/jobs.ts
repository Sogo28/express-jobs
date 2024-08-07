import express from "express";
import {
  createJob as createJobController,
  getJob as getJobController,
  getJobs as getJobsController,
  updateJob as updateJobController,
  deleteJob as deleteJobController
} from "../controllers/jobController"
import validateInputData from "../middlewares/validateInputData";
import { JobInputSchema } from "../model/domain/JobInputSchema";

const jobsRouter = express.Router();

jobsRouter.post('/', validateInputData(JobInputSchema), createJobController);
jobsRouter.get('/', getJobsController);
jobsRouter.get('/:id', getJobController);
jobsRouter.put('/:id', validateInputData(JobInputSchema), updateJobController);
jobsRouter.delete('/:id', deleteJobController)

export default jobsRouter;
