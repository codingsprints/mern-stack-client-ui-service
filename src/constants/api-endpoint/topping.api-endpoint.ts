export const toppingEndPoint = {
  createTopping: `${process.env.NEXT_PUBLIC_CATALOG_SERVICE_API}/toppings`,
  fetchToppings: (restaurantId: string) =>
    `${process.env.NEXT_PUBLIC_CATALOG_SERVICE_API}/toppings?tenantId=${restaurantId}`,
  fetchSingleTopping: (toppingId: string) =>
    `${process.env.NEXT_PUBLIC_CATALOG_SERVICE_API}/toppings/${toppingId}`,
  updateTopping: (toppingId: string) =>
    `${process.env.NEXT_PUBLIC_CATALOG_SERVICE_API}/toppings/${toppingId}`,
  deleteTopping: (toppingId: string) =>
    `${process.env.NEXT_PUBLIC_CATALOG_SERVICE_API}/toppings/${toppingId}`,
};
