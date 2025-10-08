import { orderEndPoint } from "@/constants/api-endpoint/order.api-endpoint";
import { orderQueryKey } from "@/constants/query-keys/order.query-keys";
import { OrderData, OrderStatus } from "@/lib/types";
import { axiosInstance } from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const CreateOrder = () => {
  return useMutation({
    mutationKey: [orderQueryKey.createOrder],
    mutationFn: async (details: OrderData) => {
      const { data } = await axiosInstance.post(
        orderEndPoint.createOrder,
        details,
        {
          headers: {
            "Idempotency-Key": "",
          },
        }
      );
      return data;
    },
    retry: 3,
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError(error) {
      const err = error as AxiosError<any>; // cast error to AxiosError

      toast.error(err?.response?.data?.error?.message);
    },
  });
};

export const GetOrders = () => {
  return useQuery({
    queryKey: [orderQueryKey.getOrders],
    queryFn: async () => {
      const { data } = await axiosInstance.get(orderEndPoint.getOrders);
      return data;
    },
  });
};

export const GetSingleOrder = (id: string) => {
  return useQuery({
    queryKey: [orderQueryKey.getSingleOrder, id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        orderEndPoint.getSingleOrder(id)
      );
      return data;
    },
    refetchInterval: 1000 * 30, // every 30 secs.
  });
};

export const UpdateOrder = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [orderQueryKey.updateOrder, id],
    mutationFn: async (status: OrderStatus) => {
      const { data } = await axiosInstance.post(
        orderEndPoint.updateOrder(id),
        status
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({
        queryKey: [orderQueryKey.getSingleOrder],
      });
    },
    onError(error) {
      const err = error as AxiosError<any>; // cast error to AxiosError

      toast.error(err?.response?.data?.error?.message);
    },
  });
};
