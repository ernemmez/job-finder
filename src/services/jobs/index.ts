import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import axios from "axios";

import { BaseAPI } from "..";
import { getAuthTokens } from "../auth";

export const getAllJobs = async (
  accessToken: string,
  page?: number,
  perPage?: number,
  orderBy?: { field: string; direction: string },
  search?: { field: string | undefined; query: string | undefined },
): Promise<TJobsSuccesResponse> => {
  try {
    let params: {
      page?: number;
      perPage?: number;
      orderBy?: { field: string; direction: string };
      search?: { field: string | undefined; query: string | undefined };
    } = {};

    if (page) params.page = page;
    if (perPage) params.perPage = perPage;
    if (orderBy) params.orderBy = orderBy;
    if (search) params.search = search;

    return (
      await BaseAPI.get("jobs", {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).data;
  } catch (error) {
    const axiosError = error as AxiosError<TAPIErrorResponse>;

    if (axios.isAxiosError(error)) {
      if (axiosError.response && axiosError.response.data.message) {
        throw axiosError.response.data.message;
      }
    }
    throw error;
  }
};

export const useJobsQuery = (
  page: number,
  perPage: number,
  orderBy?: { field: string; direction: string },
  search?: { field: string | undefined; query: string | undefined },
) => {
  const { accessToken } = getAuthTokens();

  return useQuery<TJobsSuccesResponse>({
    queryKey: ["getJobs", page, perPage, orderBy, search],
    queryFn: () => getAllJobs(`${accessToken}`, page, perPage, orderBy, search),
  });
};

export const getJob = async (id: string): Promise<TJob> => {
  try {
    const { accessToken } = getAuthTokens();

    return (
      await BaseAPI.get(`jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).data;
  } catch (error) {
    const axiosError = error as AxiosError<TAPIErrorResponse>;

    if (axios.isAxiosError(error)) {
      if (axiosError.response && axiosError.response.data.message) {
        throw axiosError.response.data.message;
      }
    }
    throw error;
  }
};

export const applyJob = async (jobId: string): Promise<{ message: string }> => {
  try {
    const { accessToken } = getAuthTokens();

    return (
      await BaseAPI.post(
        `jobs/${jobId}/apply`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
    ).data;
  } catch (error) {
    const axiosError = error as AxiosError<TAPIErrorResponse>;

    if (axios.isAxiosError(error)) {
      if (axiosError.response && axiosError.response.data.message) {
        throw axiosError.response.data.message;
      }
    }
    throw error;
  }
};

export const withdrawJob = async (jobId: string): Promise<{ message: string }> => {
  try {
    const { accessToken } = getAuthTokens();

    return (
      await BaseAPI.post(
        `jobs/${jobId}/withdraw`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
    ).data;
  } catch (error) {
    const axiosError = error as AxiosError<TAPIErrorResponse>;

    if (axios.isAxiosError(error)) {
      if (axiosError.response && axiosError.response.data.message) {
        throw axiosError.response.data.message;
      }
    }
    throw error;
  }
};

export const getAppliedJobs = async (idArray: string[]): Promise<TJob[]> => {
  try {
    const jobsData: TJob[] = [];

    for (const id of idArray) {
      const existingJob = jobsData.find(job => job.id === id);

      if (!existingJob) {
        try {
          const job = await getJob(id);
          jobsData.push(job);
        } catch (error) {
          console.error(`Error getting job with id ${id}: `, error);
        }
      }
    }

    return jobsData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
