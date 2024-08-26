import { PrismaClient, Company } from "@prisma/client";
import { CompanyInputType } from "../domain/CompanyInputSchema";

const prisma = new PrismaClient();

export const createCompany = async (data: CompanyInputType): Promise<Company> => {

  const { contactEmail, contactPhone, description, name, userId, location } = data;

  const newCompany = await prisma.company.create({
    data: {
      contactEmail,
      contactPhone,
      description,
      name,
      location,
      userId
    }
  })

  return newCompany;

}

export const getCompanyById = async (id: string): Promise<Company> => {

  const foundCompany = await prisma.company.findUniqueOrThrow({
    where: {
      id
    }
  })

  return foundCompany;

}

export const getCompanyByUserId = async (userId: string): Promise<Company> => {

  const foundCompany = await prisma.company.findUniqueOrThrow({
    where: {
      userId
    }
  })

  return foundCompany;
}

export const getCompanies = async (): Promise<Company[]> => {

  const companies = await prisma.company.findMany();
  return companies;

}

export const updateCompany = async (data: CompanyInputType, id: string): Promise<Company> => {

  const { contactEmail, contactPhone, description, name, userId, location } = data;

  const updatedCompany = await prisma.company.update({
    where: {
      id
    },
    data: {
      contactEmail,
      contactPhone,
      description,
      name,
      userId,
      location
    }
  })

  return updatedCompany;

}

export const deleteCompany = async (id: string): Promise<Company> => {

  const deletedCompany = await prisma.company.delete({
    where: {
      id
    }
  })

  return deletedCompany;

}