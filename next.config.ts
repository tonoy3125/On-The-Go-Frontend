import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["placeimg.com", "example.com", "res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
