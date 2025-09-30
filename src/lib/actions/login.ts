"use server";
import { authEndpoint } from "@/constants/api-endpoint/auth.api-endpoint";
import { cookies } from "next/headers";
import cookie from "cookie";

export default async function login(prevState: any, formdata: FormData) {
  const email = formdata.get("email");
  const password = formdata.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return {
      type: "error",
      message: "Email and password are required.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${authEndpoint.login}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.log("error", error);
      return {
        type: "error",
        message: (error.message as string) || "Login Failed",
      };
    }

    const c = response.headers.getSetCookie();
    const accessToken = c?.find((cookie) => cookie.includes("accessToken"));
    const refreshToken = c?.find((cookie) => cookie.includes("refreshToken"));

    if (!accessToken || !refreshToken) {
      return {
        type: "error",
        message: "No cookies were found!",
      };
    }

    console.log(accessToken, refreshToken);

    const parsedAccessToken = cookie.parse(accessToken);
    const parsedRefreshToken = cookie.parse(refreshToken);

    console.log("parsedAccessToken", parsedAccessToken);
    console.log("parsedRefreshToken", parsedRefreshToken);
    // ✅ Create NextResponse and set cookies

    if (
      parsedAccessToken &&
      parsedRefreshToken &&
      parsedAccessToken?.accessToken &&
      parsedRefreshToken?.refreshToken
    ) {
      (await cookies()).set("accessToken", parsedAccessToken.accessToken, {
        expires: new Date(parsedAccessToken.Expires!),
        httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
        path: parsedAccessToken.Path,
        domain: parsedAccessToken.Domain,
        sameSite: parsedAccessToken.SameSite as "strict",
      });

      (await cookies()).set("refreshToken", parsedRefreshToken.refreshToken, {
        expires: new Date(parsedRefreshToken.Expires!),
        httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
        path: parsedRefreshToken.Path,
        domain: parsedRefreshToken.Domain,
        sameSite: parsedRefreshToken.SameSite as "strict",
      });
    }

    return {
      type: "success",
      message: "Login successful!",
    };
  } catch (err: any) {
    return {
      type: "error",
      message: err.message as string,
    };
  }
}
