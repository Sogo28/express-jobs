import express from "express";
import { createJob as createJobController, getJob as getJobController, getJobs as getJobsController, updateJob as updateJobController } from "../controllers/jobController"
import validateInputData from "../middlewares/validateInputData";
import { JobInputSchema } from "../model/domain/JobInputSchema";

const jobsRouter = express.Router();

jobsRouter.post('/', validateInputData(JobInputSchema), createJobController);
jobsRouter.get('/', getJobsController);
jobsRouter.get('/:id', getJobController);
jobsRouter.put('/:id', updateJobController);

export default jobsRouter;
