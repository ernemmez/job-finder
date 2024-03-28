import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import * as cookie from "cookie";
import getConfig from "next/config";
import * as setCookie from "set-cookie-parser";

import { getAuthTokens, setAuthTokens } from "./auth";

const { publicRuntimeConfig } = getConfig();

const BaseAPI = axios.create({
  baseURL: publicRuntimeConfig?.processEnv.NEXT_PUBLIC_BASE_API_URL,
  withCredentials: true,
});

createAuthRefreshInterceptor(
  BaseAPI,
  failedRequest => {
    const { refreshToken: oldRefreshToken } = getAuthTokens();

    return BaseAPI.post("refresh", { refreshToken: oldRefreshToken }).then(res => {
      if (BaseAPI.defaults.headers.setCookie) {
        delete BaseAPI.defaults.headers.setCookie;
      }
      const { accessToken, refreshToken } = res.data;
      setAuthTokens(accessToken, refreshToken);

      const bearer = `Bearer ${accessToken}`;
      BaseAPI.defaults.headers.Authorization = bearer;

      const responseCookie = setCookie.parse(`${res.headers["set-cookie"]}`)[0];
      BaseAPI.defaults.headers.setCookie = res.headers["set-cookie"] || "";
      BaseAPI.defaults.headers.cookie = responseCookie
        ? cookie.serialize(responseCookie.name, responseCookie.value)
        : "";

      failedRequest.response.config.headers.Authorization = bearer;

      return Promise.resolve();
    });
  },
  {
    retryInstance: BaseAPI,
    onRetry: requestConfig => ({ ...requestConfig }),
  },
);

export { BaseAPI };
