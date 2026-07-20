import type { NextConfig } from "next";

const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 only honours quality values declared here.
    qualities: [55, 70, 75],
    // The API runs on localhost during development; production uses a public
    // hostname, so the private-IP guard stays active there.
    dangerouslyAllowLocalIP: apiUrl.hostname === "localhost" || apiUrl.hostname === "127.0.0.1",
    remotePatterns: [
      {
        protocol: apiUrl.protocol === "https:" ? "https" : "http",
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: "/api/v1/images/**",
      },
    ],
  },
};

export default nextConfig;
