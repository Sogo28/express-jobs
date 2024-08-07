import { Request, Response } from "express";
import {
  createCompany as createCompanyService,
  getCompanyById as getCompanyByIdService,
  getCompanies as getCompaniesService,
  updateCompany as updateCompanyService,
  deleteCompany as deleteCompanyService
} from "../services/CompanyServices";

// @desc    Create a Company
// @route   POST /api/companies
// @access  Public
export const createCompany = async (req: Request, res: Response) => {

  try {
    const newCompany = await createCompanyService(req.body);
    res.status(201).json({
      message: "Company created successfully",
      data: newCompany
    })

  } catch (error: any) {
    res.status(500).json({ message: "Internal Server Error" })
  }

}

// @desc    Get a company by its id
// @route   GET /api/companies/:id
// @access  Public
export const getCompany = async (req: Request, res: Response) => {

  const id = req.params.id;
  try {
    const company = await getCompanyByIdService(id);
    res.status(200).json(company);

  } catch (error: any) {
    if (error.code === "P2025" || error.code === "P2023") {
      res.status(404).json({ message: "Company not found" });

    } else {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
}

// @desc    Get companies 
// @route   GET /api/companies/
// @access  Public
export const getCompanies = async (req: Request, res: Response) => {

  try {
    const companies = await getCompaniesService();
    res.status(200).json(companies);

  } catch (error: any) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

// @desc    Update a company 
// @route   PUT /api/companies/:id
// @access  Public
export const updateCompany = async (req: Request, res: Response) => {

  const id = req.params.id;
  try {
    const updatedCompany = await updateCompanyService(req.body, id);
    res.status(204).json({
      message: "Company updated successfully",
      data: updatedCompany
    })

  } catch (error: any) {
    if (error.code === "P2025" || error.code === "P2023") {
      res.status(404).json({ message: "Company not found" });

    } else {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }

}

// @desc    Delete a company 
// @route   DELETE /api/companies/:id
// @access  Public
export const deleteCompany = async (req: Request, res: Response) => {

  const id = req.params.id;
  try {
    const deletedCompany = await deleteCompanyService(id);
    res.status(204).json({
      message: "Company deleted successfully",
      data: deletedCompany
    })

  } catch (error: any) {
    if (error.code === "P2025" || error.code === "P2023") {
      res.status(404).json({ message: "Company not found" });

    } else {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }

}