import express from "express";
import {
  getJobs as getJobsController
} from "../controllers/employerController"
import { checkToken } from "middlewares/checkToken";

const employerRouter = express.Router();

employerRouter.get("/:id/job-offers", checkToken, getJobsController);

export default employerRouter;