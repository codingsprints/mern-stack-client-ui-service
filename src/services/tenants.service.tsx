import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { tenantQueryKeys } from "@/constants/query-keys/tenant.query-keys";
import { tenantEndPoint } from "@/constants/api-endpoint/tenant.api-endPoint";
import { CreateTenantsType, tenantQueryParams } from "@/lib/types";

export const FetchTenantsWithPagination = (queryParams: tenantQueryParams) => {
  return useQuery({
    queryKey: [tenantQueryKeys.fetchTenantsWithPagination, queryParams],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        tenantEndPoint.fetchTenantsWithPagination(queryParams)
      );
      return data;
    },
    placeholderData: keepPreviousData,
  });
};

export const FetchTenant = () => {
  return useQuery({
    queryKey: [tenantQueryKeys.fetchTenant],
    queryFn: async () => {
      const { data } = await axiosInstance.get(tenantEndPoint.fetchTenant);
      return data;
    },
    placeholderData: keepPreviousData,
  });
};

export const CreateTenants = (
  callbackCreateTenantSuccess: () => void,
  callbackCreateTenantFailure: (message: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [tenantQueryKeys.createTenants],
    mutationFn: async (details: CreateTenantsType) => {
      const { data } = await axiosInstance.post(
        tenantEndPoint.createTenants,
        details
      );
      return data;
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [tenantQueryKeys.fetchTenantsWithPagination],
      });
      callbackCreateTenantSuccess();
    },
    onError(error) {
      const err = error as AxiosError<any>; // cast error to AxiosError

      if (err?.response?.data?.error[0]?.message) {
        callbackCreateTenantFailure(err?.response?.data?.error[0]?.message);
      } else if (err?.response?.data?.errors[0]?.msg) {
        callbackCreateTenantFailure(err?.response?.data?.errors[0]?.msg);
      } else {
        callbackCreateTenantFailure(err?.message);
      }
    },
  });
};

export const UpdateTenant = (
  id: string,
  callbackUpdateTenantSuccess: () => void,
  callbackUpdateTenantFailure: (message: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [tenantQueryKeys.updateTenant],
    mutationFn: async (details: CreateTenantsType) => {
      const { data } = await axiosInstance.patch(
        tenantEndPoint.updateTenant(id),
        details
      );
      return data;
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [tenantQueryKeys.fetchTenantsWithPagination],
      });
      callbackUpdateTenantSuccess();
    },
    onError(error) {
      const err = error as AxiosError<any>; // cast error to AxiosError

      if (err?.response?.data?.error[0]?.message) {
        callbackUpdateTenantFailure(err?.response?.data?.error[0]?.message);
      } else if (err?.response?.data?.errors[0]?.msg) {
        callbackUpdateTenantFailure(err?.response?.data?.errors[0]?.msg);
      } else {
        callbackUpdateTenantFailure(err?.message);
      }
    },
  });
};

export const DeleteTenant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [tenantQueryKeys.deleteTenant],
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(
        tenantEndPoint.deleteTenant(id)
      );
      return data;
    },
    onSuccess() {
      toast.success("Tenants delete successfully!!!");
      queryClient.invalidateQueries({
        queryKey: [tenantQueryKeys.fetchTenantsWithPagination],
      });
    },
    onError(error) {
      const err = error as AxiosError<any>; // cast error to AxiosError

      if (err?.response?.data?.error) {
        console.log("Data:", err);
        toast.error(err?.response?.data?.error[0]?.message);
      } else {
        toast.error(err.message);
      }
    },
  });
};
