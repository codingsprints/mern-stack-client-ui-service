import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { couponQueryKeys } from "@/constants/query-keys/coupon.query-keys";
import { couponEndpoint } from "@/constants/api-endpoint/coupon.api-endpoint";

export const GetCoupon = () => {
  return useQuery({
    queryKey: [couponQueryKeys.getCoupon],
    queryFn: async () => {
      const { data } = await axiosInstance.get(couponEndpoint.getCoupon);
      return data;
    },
  });
};

export const CreateCoupon = () => {
  return useMutation({
    mutationKey: [couponQueryKeys.createCoupon],
    mutationFn: async () => {
      const { data } = await axiosInstance.post(couponEndpoint.createCoupon);
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

export const UpdateCoupon = () => {
  return useMutation({
    mutationKey: [couponQueryKeys.updateCoupon],
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.put(couponEndpoint.updateCoupon(id));
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

export const DeleteCoupon = () => {
  return useMutation({
    mutationKey: [couponQueryKeys.deleteCoupon],
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(
        couponEndpoint.deleteCoupon(id)
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

export const VerifyCoupon = () => {
  return useMutation({
    mutationKey: [couponQueryKeys.verifyCoupon],
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.post(couponEndpoint.verifyCoupon);
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
