import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "./axios";

import store from "./app/store/store";
const setupAxiosInterceptors = (onUnauthenticated: () => void) => {
  const onRequestSuccess = (config: AxiosRequestConfig) => {
    const token = store.getState().auth.token;
    console.log("token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onRequestFail = (error: AxiosError) => {
    console.log("request error", error);
    return Promise.reject(error);
  };
  axios.interceptors.request.use(onRequestSuccess, onRequestFail);

  const onResponseSuccess = (response: AxiosResponse) => {
    console.log("response success", response);
    return response;
  };
  const onResponseFail = (
    error: { status: number } & { response: { status: number } }
  ) => {
    const status = error.status || error.response.status;
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(error);
  };
  axios.interceptors.response.use(onResponseSuccess, onResponseFail);
};
export default setupAxiosInterceptors;
