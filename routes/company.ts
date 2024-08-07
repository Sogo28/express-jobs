import express from "express";
import {
  createCompany as createCompanyController,
  getCompany as getCompanyController,
  getCompanies as getCompaniesController,
  updateCompany as updateCompanyController,
  deleteCompany as deleteCompanyController
} from "../controllers/companyController"
import validateInputData from "../middlewares/validateInputData";
import { CompanyInputSchema } from "../model/domain/CompanyInputSchema";

const companyRouter = express.Router();

companyRouter.post('/', validateInputData(CompanyInputSchema), createCompanyController);
companyRouter.get('/', getCompaniesController);
companyRouter.get('/:id', getCompanyController);
companyRouter.put('/:id', validateInputData(CompanyInputSchema), updateCompanyController);
companyRouter.delete('/:id', deleteCompanyController);

export default companyRouter;
