// src/lib/auth.ts
import { authEndpoint } from "@/constants/api-endpoint/auth.api-endpoint";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { toast } from "react-toastify";
import cookie from "cookie";
// import { cookies } from "next/headers";
import Cookies from "js-cookie";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials", credentials);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}${authEndpoint.login}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          console.log("Login failed:", data);
          return null;
        }

        // console.log("data -> ", data);

        const c = res.headers.getSetCookie();
        const accessToken = c.find((cookie) => cookie.includes("accessToken"));
        const refreshToken = c.find((cookie) =>
          cookie.includes("refreshToken")
        );
        if (!accessToken || !refreshToken) {
          toast.error("No cookies were found!");
          return null;
        }

        const parsedAccessToken = cookie.parse(accessToken);
        const parsedRefreshToken = cookie.parse(refreshToken);

        console.log("parsedAccessToken", parsedAccessToken);
        console.log("parsedRefreshToken", parsedRefreshToken);

        if (
          parsedAccessToken &&
          parsedRefreshToken &&
          parsedAccessToken?.accessToken &&
          parsedRefreshToken?.refreshToken
        ) {
          // (await cookies()).set({
          //   name: "accessToken",
          //   value: parsedAccessToken.accessToken,
          //   expires: new Date(parsedAccessToken.expires!),
          //   // todo: check auth service for httpOnly parameter
          //   httpOnly:
          //     (parsedAccessToken.httpOnly as unknown as boolean) || true,
          //   path: parsedAccessToken.Path,
          //   domain: parsedAccessToken.Domain,
          //   sameSite: parsedAccessToken.SameSite as "strict",
          // });

          // (await cookies()).set({
          //   name: "refreshToken",
          //   value: parsedRefreshToken.refreshToken,
          //   expires: new Date(parsedRefreshToken.expires!),
          //   // todo: check auth service for httpOnly parameter
          //   httpOnly:
          //     (parsedRefreshToken.httpOnly as unknown as boolean) || true,
          //   path: parsedRefreshToken.Path,
          //   domain: parsedRefreshToken.Domain,
          //   sameSite: parsedRefreshToken.SameSite as "strict",
          // });

          Cookies.set("accessToken", parsedAccessToken.accessToken, {
            expires: new Date(parsedAccessToken.expires!),
            httpOnly:
              (parsedAccessToken.httpOnly as unknown as boolean) || true,
            path: parsedAccessToken.Path,
            domain: parsedAccessToken.Domain,
            sameSite: parsedAccessToken.SameSite as "strict",
          });

          Cookies.set("refreshToken", parsedRefreshToken.refreshToken, {
            expires: new Date(parsedRefreshToken.expires!),
            httpOnly:
              (parsedRefreshToken.httpOnly as unknown as boolean) || true,
            path: parsedRefreshToken.Path,
            domain: parsedRefreshToken.Domain,
            sameSite: parsedRefreshToken.SameSite as "strict",
          });
        }
        // console.log("data accessToken --->", Cookies.get("accessToken"));
        return {
          id: data?.data?.loginUserDto?.id,
          name: data?.data?.loginUserDto?.fullName,
          email: data?.data?.loginUserDto?.email,
          accessToken: parsedAccessToken?.accessToken,
          refreshToken: parsedRefreshToken?.refreshToken,
        };
        // Return user object along with tokens
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {},
  callbacks: {
    async authorized({ auth }: any) {
      console.log("auth ===> ", auth);
      return auth;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      // console.log("user jwt ---> ", user);
      // console.log("token ---> ", token);
      return token;
    },
    async session({ session, token }: any) {
      // console.log("user jwt token---> ", token);
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
      }
      // console.log("session --->", session);
      return session;
    },
  },
  pages: {
    signIn: "/login", // your login page
  },
});
