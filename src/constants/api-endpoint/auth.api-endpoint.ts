export const authEndpoint = {
  login: `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API}/auth/login`,
  register: `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API}/auth/register`,
  self: `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API}/auth/self`,
  selfRoot: `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API}/auth/self`,
  logout: `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API}/auth/logout`,
  refresh: `${process.env.NEXT_PUBLIC_AUTH_SERVICE_API}/auth/refresh`,
};
