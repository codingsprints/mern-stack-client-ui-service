export const productEndPoint = {
  createProducts: `${process.env.NEXT_PUBLIC_CATALOG_SERVICE_API}/products`,
  fetchProducts: (restaurantId: string) =>
    `${process.env.NEXT_PUBLIC_CATALOG_SERVICE_API}/products?page=1&limit=100&tenantId=${restaurantId}`,
  fetchSingleProduct: (productId: string) =>
    `${process.env.NEXT_PUBLIC_CATALOG_SERVICE_API}/products/${productId}`,
  updateProducts: (productId: string) =>
    `${process.env.NEXT_PUBLIC_CATALOG_SERVICE_API}/products/${productId}`,
  deleteProducts: (productId: string) =>
    `${process.env.NEXT_PUBLIC_CATALOG_SERVICE_API}/products/${productId}`,
};
