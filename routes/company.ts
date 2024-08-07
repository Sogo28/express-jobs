import express from "express";
import { createCompany as createCompanyController, getCompany as getCompanyController, updateCompany as updateCompanyController } from "../controllers/companyController"
import validateInputData from "../middlewares/validateInputData";
import { CompanyInputSchema } from "../model/domain/CompanyInputSchema";

const companyRouter = express.Router();

companyRouter.post('/', validateInputData(CompanyInputSchema), createCompanyController);
companyRouter.get('/:id', getCompanyController);
companyRouter.put('/:id', updateCompanyController);

export default companyRouter;
