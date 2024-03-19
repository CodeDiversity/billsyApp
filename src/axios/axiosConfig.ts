import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';


// Create an Axios instance with default configuration
const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // Additional default configurations can be added here
  timeout: 10000, // Optional: Set default request timeout
});

client.interceptors.request.use(
  //@ts-expect-error - The config parameter is not used in this function
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...(config.headers as AxiosRequestHeaders),
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;