import { createJob as createJobDAO, getJobs as getJobsDAO, getJobById as getJobByIdDAO, updateJob as updateJobDAO } from "../model/DAO/JobDAO";
import { Job } from "@prisma/client";
import { JobInputType } from "../model/domain/JobInputSchema";

export const createJob = async (data: JobInputType): Promise<Job> => {

  const newJob = await createJobDAO(data);
  return newJob;

}

export const getJobs = async (): Promise<Job[]> => {

  const jobs = await getJobsDAO();
  return jobs;

}

export const getJobById = async (id: string): Promise<Job> => {

  const job = await getJobByIdDAO(id);
  return job;

}

export const updateJob = async (data: JobInputType, id: string): Promise<Job> => {

  const updatedJob = await updateJobDAO(data, id);
  return updatedJob;

}