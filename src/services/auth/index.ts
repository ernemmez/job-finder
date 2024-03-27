import type { AxiosError } from "axios";
import axios from "axios";
import Cookies from "js-cookie";

import { BaseAPI } from "..";

export const signUpReq = async (body: TLoginRequestBody): Promise<TLoginSuccesResponse> => {
  try {
    return (await BaseAPI.post("register", body)).data;
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
  // only works in client
  Cookies.set("accessToken", accessToken);
  Cookies.set("refreshToken", refreshToken);
};

export const getAuthTokens = () => {
  // only works in client
  return {
    accessToken: Cookies.get("accessToken"),
    refreshToken: Cookies.get("refreshToken"),
  };
};

export const logout = () => {
  // only works in client
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

export const getCurrentUser = async (): Promise<TUser> => {
  try {
    const { accessToken } = getAuthTokens();

    return (
      await BaseAPI.get("user", {
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

export const getProfile = async (): Promise<TUser> => {
  try {
    const { accessToken } = getAuthTokens();

    return (
      await BaseAPI.get("profile", {
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

// export const refreshTokenReq = async (): Promise<TLoginSuccesResponse | { message: string }> => {
//   try {
//     const { accessToken, refreshToken } = getAuthTokens();

//     return (
//       await BaseAPI.get("refresh", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         data: { refreshToken },
//       })
//     ).data;
//   } catch (error) {
//     console.log("Error: session destroyed");
//     // logout
//     throw error;
//   }
// };
