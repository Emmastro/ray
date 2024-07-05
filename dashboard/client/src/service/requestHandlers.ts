/**
 * This utility file formats and sends HTTP requests such that
 * they fullfill the requirements expected by users of the dashboard.
 *
 * All HTTP requests should be sent using the helpers in this file.
 *
 * More HTTP Methods helpers should be added to this file when the need
 * arises.
 */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";


const axiosInstance = axios.create();

// Set the Authorization header with the JWT token
export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};


// Initialize axios with token from localStorage
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

// Wrapper function to create the interceptor
export const setupInterceptors = (navigate: NavigateFunction) => {
  console.log("Setting up interceptors");
  axiosInstance.interceptors.response.use(
    (response) => {
      // If the response is successful, just return the response
      return response;
    },
    (error) => {
      console.log("Error in axios interceptor", error);

       // If the response is unauthorized, and the request is not for login or registration, redirect to login
       if (
        error.response &&
        error.response.status === 401 &&
        !error.config.url.includes("login") &&
        !error.config.url.includes("register")
      ) {
        console.log("current url", error.config.url);
        navigate("/register");
      }
      // Return the error so the caller can handle it if necessary
      return Promise.reject(error);
    },
  );
};


/**
 * This function formats URLs such that the user's browser
 * sets the HTTP request's Request URL relative to the path at
 * which the dashboard is served.
 * This works behind a reverse proxy.
 *
 * @param {String} url The URL to be hit
 * @return {String}    The reverse proxy compatible URL
 */
export const formatUrl = (url: string): string => {
  if (url.startsWith("/")) {
    return url.slice(1);
  }
  return url;
};

export const get = <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<R> => {
  console.log(`URL fetched: ${formatUrl(url)} - config  ${config}`);
  return axiosInstance.get<T, R>(formatUrl(url), config);
};

export const post = <T = any, R = AxiosResponse<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<R> => {
  console.log(`URL posted: ${formatUrl(url)} - data  ${data} - config  ${config}`);
  return axiosInstance.post<T, R>(formatUrl(url), data, config);
}

