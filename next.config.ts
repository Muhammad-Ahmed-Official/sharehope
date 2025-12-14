import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
  /* config options here */
  // cacheComponents: true
// };

// /** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: "/sw.js",
      headers: [
        {
          key: "Content-Type",
          value: "application/javascript; charset=utf-8",
        },
        {
          key: "Cache-Control",
          value: "no-cache, no-store, must-revalidate",
        },
      ],
    },
  ],
};

module.exports = nextConfig;
