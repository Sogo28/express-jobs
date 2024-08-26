import express from "express";
import {
  getJobs as getJobsController,
  getCompany as getCompanyController
} from "../controllers/employerController"
import { checkToken } from "middlewares/checkToken";

const employerRouter = express.Router();

employerRouter.get("/:id/job-offers", checkToken, getJobsController);
employerRouter.get("/:id/company", getCompanyController);

export default employerRouter;