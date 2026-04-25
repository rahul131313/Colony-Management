import axios, { AxiosError } from "axios";
import axiosRetry from "axios-retry";
import { secureStorage } from "../storage/secureStorage";

export const apiClient = axios.create({
  baseURL: "https://api.colonyconnect.example.com/v1",
  timeout: 20_000
});

apiClient.interceptors.request.use(async (config) => {
  const token = await secureStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["X-Client-Platform"] = "mobile";
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ code?: string; message?: string }>) => {
    if (error.response?.status === 401) {
      await secureStorage.clearToken();
    }
    return Promise.reject(
      new Error(error.response?.data?.message ?? error.message ?? "Unexpected API error")
    );
  }
);

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === 429
});
