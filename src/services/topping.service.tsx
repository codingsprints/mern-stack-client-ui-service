import { toppingEndPoint } from "@/constants/api-endpoint/topping.api-endpoint";
import { toppingQueryKey } from "@/constants/query-keys/topping.query-keys";
import { axiosInstance } from "@/utils/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const FetchToppings = (restaurantId: string) => {
  return useQuery({
    queryKey: [toppingQueryKey.fetchToppings, restaurantId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        toppingEndPoint.fetchToppings(restaurantId)
      );
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
