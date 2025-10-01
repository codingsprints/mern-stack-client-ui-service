import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { AxiosError } from "axios";
import { Credentials } from "@/lib/types";
import cookie from "cookie";
import { toast } from "react-toastify";
import { customerEndpoint } from "@/constants/api-endpoint/customer.api-endpoint";
import { customerQueryKeys } from "@/constants/query-keys/customer.query-keys";

export const GetCustomer = () => {
  return useQuery({
    queryKey: [customerQueryKeys.getCustomer],
    queryFn: async () => {
      const { data } = await axiosInstance.get(customerEndpoint.getCustomer);
      return data;
    },
  });
};

export const UpdateCustomerAddress = () => {
  return useMutation({
    mutationKey: [customerQueryKeys.updateCustomerAddress],
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.patch(
        customerEndpoint.updateCustomerAddress(id)
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError(error) {
      const err = error as AxiosError<any>; // cast error to AxiosError

      toast.error(err?.response?.data?.error?.message);
    },
  });
};
