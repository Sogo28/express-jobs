import {
  createCompany as createCompanyDAO,
  getCompanyById as getCompanyByIdDAO,
  getCompanies as getCompaniesDAO,
  updateCompany as updateCompanyDAO,
  deleteCompany as deleteCompanyDAO
} from "../model/DAO/CompanyDAO";
import { Company } from "@prisma/client";
import { CompanyInputType } from "../model/domain/CompanyInputSchema";

export const createCompany = async (data: CompanyInputType): Promise<Company> => {

  const newCompany = await createCompanyDAO(data);
  return newCompany;

}

export const getCompanyById = async (id: string): Promise<Company> => {

  const Company = await getCompanyByIdDAO(id);
  return Company;

}

export const getCompanies = async (): Promise<Company[]> => {

  const Company = await getCompaniesDAO();
  return Company;

}

export const updateCompany = async (data: CompanyInputType, id: string): Promise<Company> => {

  const updatedCompany = await updateCompanyDAO(data, id);
  return updatedCompany;

}

export const deleteCompany = async (id: string): Promise<Company> => {

  const deletedCompany = await deleteCompanyDAO(id);
  return deletedCompany;

}