import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.blog.redberryinternship.ge/api",
});

// Intercept requests to add the token to the headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
