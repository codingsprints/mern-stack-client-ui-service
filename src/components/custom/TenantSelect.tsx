"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tenant } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { FetchTenant } from "@/services/tenants.service";

const TenantSelect = () => {
  //   const router = useRouter();
  //   const searchParams = useSearchParams();

  //   const handleValueChange = (value: string) => {
  //     router.push(`/?restaurantId=${value}`);
  //   };

  const { data: tenantData } = FetchTenant();

  return (
    <Select
    //   onValueChange={handleValueChange}
    //   defaultValue={searchParams.get("restaurantId") || ""}
    >
      <SelectTrigger className="w-[180px] focus:ring-0">
        <SelectValue placeholder="Select Restaurant" />
      </SelectTrigger>
      <SelectContent>
        {tenantData?.data?.tenantGetAllDto?.map((restaurant: Tenant) => {
          return (
            <SelectItem key={restaurant.id} value={String(restaurant.id)}>
              {restaurant.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TenantSelect;
