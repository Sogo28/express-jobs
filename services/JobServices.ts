import {
  createJob as createJobDAO,
  getJobs as getJobsDAO,
  getJobById as getJobByIdDAO,
  getJobsByEmployer as getJobsByEmployerDAO,
  updateJob as updateJobDAO,
  deleteJob as deleteJobDAO
} from "../model/DAO/JobDAO";
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

export const getJobsByEmployer = async (userId: string): Promise<Job[]> => {

  const jobs = await getJobsByEmployerDAO(userId);
  return jobs;

}

export const updateJob = async (data: JobInputType, id: string): Promise<Job> => {

  const updatedJob = await updateJobDAO(data, id);
  return updatedJob;

}

export const deleteJob = async (id: string): Promise<Job> => {

  const deletedJob = await deleteJobDAO(id);
  return deletedJob;

}