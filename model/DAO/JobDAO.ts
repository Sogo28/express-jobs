import { PrismaClient, Job } from "@prisma/client";
import { JobInputType } from "../domain/JobInputSchema";

const prisma = new PrismaClient();

export const createJob = async (data: JobInputType): Promise<Job> => {

  const { description, location, salary, title, type, userId } = data

  const newJob = await prisma.job.create({
    data: {
      description,
      location,
      salary,
      title,
      type,
      userId
    }
  })

  return newJob;

}

export const getJobById = async (id: string): Promise<Job> => {

  const foundJob = await prisma.job.findUniqueOrThrow({
    where: {
      id
    }
  })

  return foundJob;

}

export const getJobs = async (): Promise<Job[]> => {

  const jobs = await prisma.job.findMany();
  return jobs;

}

export const getJobsByEmployer = async (userId: string): Promise<Job[]> => {

  const jobs = await prisma.job.findMany({
    where: {
      userId
    }
  })

  return jobs;
}

export const updateJob = async (job: JobInputType, id: string): Promise<Job> => {

  const { description, location, salary, title, type } = job

  const updatedJob = await prisma.job.update({
    where: {
      id: id
    },
    data: {
      description,
      location,
      salary,
      title,
      type
    }
  })

  return updatedJob

}

export const deleteJob = async (id: string): Promise<Job> => {

  const deletedJob = await prisma.job.delete({
    where: {
      id
    }
  })

  return deletedJob;

}

