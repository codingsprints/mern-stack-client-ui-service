import { tenantQueryParams } from "@/lib/types";
export const tenantEndPoint = {
  fetchTenantsWithPagination: (queryParams: tenantQueryParams) =>
    `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API}/tenants?perPage=${
      queryParams?.perPage || 6
    }&currentPage=${queryParams?.currentPage || 1}&q=${queryParams?.q || ""}`,

  fetchTenant: `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API}/tenants?perPage=1000&currentPage=1`,
  createTenants: `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API}/tenants`,
  updateTenant: (id: string) =>
    `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API}/tenants/${id}`,
  deleteTenant: (id: string) =>
    `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API}/tenants/${id}`,
};
