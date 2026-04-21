import axios from "axios";
import keycloak from "../keycloak";

const api = axios.create({
  baseURL: "http://localhost:8082", // your API gateway port
});

api.interceptors.request.use((config) => {
  if (keycloak.token) {
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      await keycloak.updateToken(30);
      error.config.headers.Authorization = `Bearer ${keycloak.token}`;
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);

export default api;