import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const BaseAPI = axios.create({ baseURL: publicRuntimeConfig?.processEnv.NEXT_PUBLIC_BASE_API_URL });
