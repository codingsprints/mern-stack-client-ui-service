export const categoriesEndPoint = {
  createCategories: `${process.env.NEXT_PUBLIC_CATALOG_SERVICE_API}/categories`,
  fetchCategories: `${process.env.NEXT_PUBLIC_CATALOG_SERVICE_API}/categories`,
  fetchSingleCategory: (categoryId: string) =>
    `${process.env.NEXT_PUBLIC_CATALOG_SERVICE_API}/categories/${categoryId}`,
  updateCategories: (categoryId: string) =>
    `${process.env.NEXT_PUBLIC_CATALOG_SERVICE_API}/categories/${categoryId}`,
  deleteCategories: (categoryId: string) =>
    `${process.env.NEXT_PUBLIC_CATALOG_SERVICE_API}/categories/${categoryId}`,
};
