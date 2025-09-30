import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { AxiosError } from "axios";
import { authQueryKeys } from "@/constants/query-keys/auth.query-keys";
import { authEndpoint } from "@/constants/api-endpoint/auth.api-endpoint";
import { Credentials } from "@/lib/types";
import cookie from "cookie";
import { toast } from "react-toastify";

export const loginUser = (callbackSuccess: () => void) => {
  return useMutation({
    mutationKey: [authQueryKeys.loginUser],
    mutationFn: async (details: Credentials) => {
      const response = await axiosInstance.post(authEndpoint.login, details);

      return response.data;
    },
    onSuccess: () => {
      console.log("hello");
      callbackSuccess();
    },
    onError(error) {
      const err = error as AxiosError<any>; // cast error to AxiosError

      toast.error(err?.response?.data?.error?.message);
    },
  });
};

export const selfUserRoot = () => {
  return useQuery({
    queryKey: [authQueryKeys.selfUserRoot],
    queryFn: async () => {
      const { data } = await axiosInstance.get(authEndpoint.selfRoot);
      return data;
    },
    // enabled: false,
    retry: (failureCount: number, error) => {
      console.log(error);
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const selfUser = () => {
  return useQuery({
    queryKey: [authQueryKeys.selfUser],
    queryFn: async () => {
      const { data } = await axiosInstance.get(authEndpoint.self);
      return data;
    },
    // enabled: false,
    retry: (failureCount: number, error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const logoutUser = () => {
  return useMutation({
    mutationKey: [authQueryKeys.logoutUser],
    mutationFn: async () => {
      const { data } = await axiosInstance.post(authEndpoint.logout);
      return data;
    },
    onSuccess: async () => {
      toast.success("user logout successfully!!");
    },
    onError: (error) => {
      const err = error as AxiosError<any>;
      toast.error(err?.response?.data?.error?.message);
    },
  });
};
