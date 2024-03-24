import type { AxiosError } from "axios";
import axios from "axios";
import Cookies from "js-cookie";

import { BaseAPI } from "..";

export const loginReq = async (body: TLoginRequestBody): Promise<TLoginSuccesResponse> => {
  try {
    return (await BaseAPI.post("login", body)).data;
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

export const setAuthTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set("accessToken", accessToken);
  Cookies.set("refreshToken", refreshToken);
};

export const getAuthTokens = () => {
  return {
    accessToken: Cookies.get("accessToken"),
    refreshToken: Cookies.get("refreshToken"),
  };
};

export const logout = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

export const getProfile = async (): Promise<TLoginSuccesResponse> => {
  try {
    return (await BaseAPI.get("profile")).data;
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
