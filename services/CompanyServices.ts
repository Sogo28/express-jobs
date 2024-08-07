import { createCompany as createCompanyDAO, updateCompany as updateCompanyDAO, getCompanyById as getCompanyByIdDAO } from "../model/DAO/CompanyDAO";
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

export const updateCompany = async (data: CompanyInputType, id: string): Promise<Company> => {

  const updatedCompany = await updateCompany(data, id);
  return updatedCompany;

}