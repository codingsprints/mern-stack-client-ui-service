import { CATALOG_SERVICE } from "../constant";

export const toppingEndPoint = {
  createTopping: `${CATALOG_SERVICE}/toppings`,
  fetchToppings: (restaurantId: string) =>
    `${CATALOG_SERVICE}/toppings?tenantId=${restaurantId}`,
  fetchSingleTopping: (toppingId: string) =>
    `${CATALOG_SERVICE}/toppings/${toppingId}`,
  updateTopping: (toppingId: string) =>
    `${CATALOG_SERVICE}/toppings/${toppingId}`,
  deleteTopping: (toppingId: string) =>
    `${CATALOG_SERVICE}/toppings/${toppingId}`,
};
