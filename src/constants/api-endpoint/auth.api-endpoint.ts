export const authEndpoint = {
  login: `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API}/auth/login`,
  self: `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API}/auth/self`,
  selfRoot: `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API}/auth/self`,
  logout: `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API}/auth/logout`,
};
