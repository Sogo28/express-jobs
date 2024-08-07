import { Request, Response } from "express";
import { createCompany as createCompanyService, getCompanyById as getCompanyByIdService, updateCompany as updateCompanyService } from "../services/CompanyServices";
import { CustomError } from "../model/domain/CustomError";

// @desc    Create a Company
// @route   POST /api/Companys
// @access  Public
export const createCompany = async (req: Request, res: Response) => {

  try {
    const newCompany = await createCompanyService(req.body);
    res.status(201).json({
      message: "Company created successfully",
      data: newCompany
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

// @desc    Get a company by its id
// @route   GET /api/company/:id
// @access  Public
export const getCompany = async (req: Request, res: Response) => {

  const companyId = req.params.companyId;
  try {
    const company = await getCompanyByIdService(companyId);
    res.status(200).json(company);

  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });

    } else {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
}

// @desc    Updata a company 
// @route   PUT /api/company/:id
// @access  Public
export const updateCompany = async (req: Request, res: Response) => {

  const companyId = req.params.companyId;
  try {
    const updatedCompany = await updateCompanyService(req.body, companyId);
    res.status(204).json({
      message: "Company updated successfully",
      data: updatedCompany
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