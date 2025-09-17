import { CATALOG_SERVICE } from "../constant";

export const productEndPoint = {
  createProducts: `${CATALOG_SERVICE}/products`,
  fetchProducts: (restaurantId: string) =>
    `${CATALOG_SERVICE}/products?page=1&limit=100&tenantId=${restaurantId}`,
  fetchSingleProduct: (productId: string) =>
    `${CATALOG_SERVICE}/products/${productId}`,
  updateProducts: (productId: string) =>
    `${CATALOG_SERVICE}/products/${productId}`,
  deleteProducts: (productId: string) =>
    `${CATALOG_SERVICE}/products/${productId}`,
};
