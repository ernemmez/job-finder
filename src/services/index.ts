import axios from "axios";
import getConfig from "next/config";

import { refreshTokenReq, setAuthTokens } from "./auth";

const { publicRuntimeConfig } = getConfig();

const BaseAPI = axios.create({ baseURL: publicRuntimeConfig?.processEnv.NEXT_PUBLIC_BASE_API_URL });

BaseAPI.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      try {
        const { accessToken, refreshToken } = (await refreshTokenReq()) as TLoginSuccesResponse;
        const originalReq = error.config;

        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        originalReq.headers["Authorization"] = `Bearer ${accessToken}`;
        setAuthTokens(accessToken, refreshToken);
        console.log("ricardo quaresma", originalReq.headers);

        return axios(originalReq);
      } catch (refreshErr) {
        console.log("ricardo balotelli");
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  },
);

export { BaseAPI };
