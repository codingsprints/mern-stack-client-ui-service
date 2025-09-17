import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const refreshToken = async () => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_AUTH_SERVICE_API}/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._isRetry) {
      try {
        originalRequest._isRetry = true;
        const headers = { ...originalRequest.headers };
        await refreshToken();
        return axiosInstance.request({ ...originalRequest, headers });
      } catch (err) {
        console.error("Token refresh error", err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
