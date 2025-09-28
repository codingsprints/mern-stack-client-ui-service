import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["mern-stack-pizza-app-project.s3.ap-south-1.amazonaws.com"],
  },
  env: {
    NEXT_VAL: process.env.NEXT_VAL,
  },
};

export default nextConfig;
