"use serve r";

import { authEndpoint } from "@/constants/api-endpoint/auth.api-endpoint";
import { cookies } from "next/headers";

export const logout = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${authEndpoint.logout}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
        cookie: `refreshToken=${(await cookies()).get("refreshToken")?.value}`,
      },
    }
  );

  if (!response.ok) {
    console.log("Lgout failed", response.status);
    return false;
  }

  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
  return true;
};
