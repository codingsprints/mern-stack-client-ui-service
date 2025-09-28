import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { authQueryKeys } from "@/constants/query-keys/auth.query-keys";
import { authEndpoint } from "@/constants/api-endpoint/auth.api-endpoint";
import { Credentials } from "@/lib/types";
import cookie from "cookie";

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

export const logoutUser = (
  callbackLogOutSuccess: () => void,
  callbackLogOutError: (message: string) => void
) => {
  return useMutation({
    mutationKey: [authQueryKeys.logoutUser],
    mutationFn: async () => {
      const { data } = await axiosInstance.post(authEndpoint.logout);
      return data;
    },
    onSuccess: async () => {
      await callbackLogOutSuccess();
    },
    onError: (error) => {
      const err = error as AxiosError<any>;
      if (err.response) {
        callbackLogOutError(
          err?.response?.data?.error?.[0]?.message || "Logout failed"
        );
      } else {
        callbackLogOutError(err.message);
      }
    },
  });
};
