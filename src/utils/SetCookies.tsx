import cookie from "cookie";
import { cookies } from "next/headers";
import { toast } from "react-toastify";

export const SetCookies = async (response: Response) => {
  const c = response.headers.getSetCookie();
  const accessToken = c?.find((cookie) => cookie.includes("accessToken"));
  const refreshToken = c?.find((cookie) => cookie.includes("refreshToken"));

  if (!accessToken || !refreshToken) {
    console.log("Tokens could not found.");
    return { type: "error", message: "Tokens could not found." };
  }

  const parsedAccessToken = cookie.parse(accessToken);
  const parsedRefreshToken = cookie.parse(refreshToken);
  if (
    parsedAccessToken &&
    parsedRefreshToken &&
    parsedAccessToken?.accessToken &&
    parsedRefreshToken?.refreshToken
  ) {
    (await cookies()).set({
      name: "accessToken",
      value: parsedAccessToken.accessToken,
      expires: new Date(parsedAccessToken.expires!),
      // todo: check auth service for httpOnly parameter
      httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
      path: parsedAccessToken.Path,
      domain: parsedAccessToken.Domain,
      sameSite: parsedAccessToken.SameSite as "strict",
    });

    (await cookies()).set({
      name: "refreshToken",
      value: parsedRefreshToken.refreshToken,
      expires: new Date(parsedRefreshToken.expires!),
      // todo: check auth service for httpOnly parameter
      httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
      path: parsedRefreshToken.Path,
      domain: parsedRefreshToken.Domain,
      sameSite: parsedRefreshToken.SameSite as "strict",
    });
  } else {
    return {
      type: "error",
      message: "Missing cookie values or expires fields.",
    };
  }
};
