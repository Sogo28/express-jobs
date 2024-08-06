import { PrismaClient, Job } from "@prisma/client";
import { CustomError } from "../domain/CustomError";
import { JobInputType } from "../domain/JobInputSchema";

const prisma = new PrismaClient();

export const createJob = async (data: JobInputType): Promise<Job> => {

  const { company, description, location, salary, title, type } = data

  const foundCompany = await prisma.company.findUnique({
    where: {
      contactEmail: company.contactEmail
    }
  })

  if (!foundCompany) {
    const newCompany = await prisma.company.create({
      data: {
        name: company.name,
        contactEmail: company.contactEmail,
        contactPhone: company.contactPhone,
        description: company.description,
        jobs: {
          create: [
            {
              description,
              location,
              salary,
              title,
              type
            }
          ]
        }
      }
    })

    const newJob = await prisma.job.findUnique({
      where: {
        companyId: newCompany.id
      }
    })

    if (!newJob) throw new CustomError("Internal server Error", 500);
    return newJob

  }

  const newJob = await prisma.job.create({
    data: {
      description,
      location,
      salary,
      title,
      type,
      companyId: foundCompany.id
    }
  })

  if (!newJob) throw new CustomError("Internal server Error", 500);
  return newJob

}

export const getJobById = async (id: string): Promise<Job> => {

  const foundJob = await prisma.job.findUnique({
    where: {
      id
    }
  })


  if (!foundJob) throw new CustomError("Job not found", 404);

  return foundJob;

}

export const getJobs = async (): Promise<Job[]> => {

  const jobs = await prisma.job.findMany();

  return jobs;
}

