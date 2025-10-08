import { cookies } from "next/headers";
import { Session, User } from "./types";
import { authEndpoint } from "@/constants/api-endpoint/auth.api-endpoint";

export const getSession = async () => {
  return await getSelf();
};

const getSelf = async (): Promise<Session | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${authEndpoint.selfRoot}`,
    {
      headers: {
        Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  console.log("response -", response);

  return {
    user: (await response.json()) as User,
  };
};
