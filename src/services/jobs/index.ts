import type { AxiosError } from "axios";
import axios from "axios";

import { BaseAPI } from "..";

export const getAllJobs = async (accessToken: string): Promise<TJobsSuccesResponse> => {
  console.log("eren emmez");
  try {
    return (
      await BaseAPI.get("jobs", {
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
