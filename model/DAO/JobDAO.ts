import { PrismaClient, Job } from "@prisma/client";
import { CustomError } from "../domain/CustomError";
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

  if (!newJob) throw new CustomError("Internal Server Error", 500);
  return newJob;

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

export const updateJob = async (job: JobInputType, id: string): Promise<Job> => {

  const foundJob = await getJobById(id);
  const { description, location, salary, title, type } = job

  const updatedJob = await prisma.job.update({
    where: {
      id: foundJob.id
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

