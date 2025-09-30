// src/lib/actions/register.ts
"use server";
import { authEndpoint } from "@/constants/api-endpoint/auth.api-endpoint";
import { SetCookies } from "@/utils/SetCookies";
import cookie from "cookie";
import { cookies } from "next/headers";

export default async function register(prevState: any, formData: FormData) {
  try {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${authEndpoint.register}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.log("error --->", error);
      return {
        type: "error",
        message: error?.error?.message || "Registration failed",
      };
    }

    const cookieValue = await SetCookies(response);

    if (cookieValue?.type === "error") {
      return {
        type: cookieValue?.type,
        message: cookieValue?.message,
      };
    }

    const c = response.headers.getSetCookie();
    const accessToken = c.find((cookie) => cookie.includes("accessToken"));
    const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

    if (!accessToken || !refreshToken) {
      return {
        type: "error",
        message: "Tokens could not found.",
      };
    }

    const parsedAccessToken = cookie.parse(accessToken);
    const parsedRefreshToken = cookie.parse(refreshToken);

    if (
      accessToken &&
      refreshToken &&
      parsedAccessToken.accessToken &&
      parsedRefreshToken.refreshToken
    ) {
      (await cookies()).set("accessToken", parsedAccessToken.accessToken, {
        expires: new Date(parsedAccessToken.expires!),
        // todo: check auth service for httpOnly parameter
        httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
        path: parsedAccessToken.Path,
        domain: parsedAccessToken.Domain,
        sameSite: parsedAccessToken.SameSite as "strict",
      });

      (await cookies()).set("refreshToken", parsedRefreshToken.refreshToken, {
        expires: new Date(parsedRefreshToken.expires!),
        // todo: check auth service for httpOnly parameter
        httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
        path: parsedRefreshToken.Path,
        domain: parsedRefreshToken.Domain,
        sameSite: parsedRefreshToken.SameSite as "strict",
      });
    }
    return {
      type: "success",
      message: "Registration successful!",
    };
  } catch (err: any) {
    return {
      type: "error",
      message: err.message,
    };
  }
}
