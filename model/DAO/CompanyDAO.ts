import { PrismaClient, Company } from "@prisma/client";
import { CustomError } from "../domain/CustomError";
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

  if (!newCompany) throw new CustomError("Internal Server Error", 500);
  return newCompany;

}

export const getCompanyById = async (id: string): Promise<Company> => {

  const foundCompany = await prisma.company.findUnique({
    where: {
      id
    }
  })

  if (!foundCompany) throw new CustomError("This company doesnt exist", 404);
  return foundCompany;

}

export const updateCompany = async (data: CompanyInputType, id: string): Promise<Company> => {

  const { contactEmail, contactPhone, description, name, userId, location } = data;

  const foundCompany = await prisma.company.findUnique({
    where: {
      id
    }
  })

  if (!foundCompany) throw new CustomError("This company doesnt exist", 404);

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

  if (!updatedCompany) throw new CustomError("Internal Server Error", 500);
  return updatedCompany;

}